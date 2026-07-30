const Memoria = require("../models/Memoria")

const fs = require("fs")

const createMemory = async(req, res)=> {
   try {
    const {title, description} = req.body;

    const src = `img/${req.file.filename}`

    if(!title || !description){
        return res.status(400).json({msg: "É necessário preencher todos os campos."})
    }

    const novaMemoria = new Memoria({
        title, src, description
    })

    await novaMemoria.save()
    res.json({msg: "Criada com sucesso!", novaMemoria})

   } catch (error){
    console.log(error.message)
    res.status(500).send("Error")
   }
};

const getMemories = async (req, res) => {
    try{
        const memories = await Memoria.find();
        res.json(memories);
    }  catch (error){
    console.log(error.message)
    res.status(500).send("Error")
   }
}

const getMemory = async (req, res) => {
    try{

        const memory = await Memoria.findById(req.params.id);

        if(!memory){
            return res.status(400).json({msg: "Memória não foi encontrada"})
        }

        res.json(memory);

    } catch (error){
    console.log(error.message)
    res.status(500).send("Error")
   }
}

const deleteMemory = async (req, res) => {
    try{
        const memory = await Memoria.findById(req.params.id)

    if(!memory){
        return res.status(400).json({msg: "Memória não foi encontrada"})
    }

    // Excluir a imagem
    fs.unlink(`public/${memory.src}`, (err) => {
        if(err) {
            console.log("Erro ao deletar a imagem:", err);
        } else {
            console.log("Imagem foi deletada com sucesso!")
        }
    });

    // Remover o documento do mongoDB
    await Memoria.findByIdAndDelete(req.params.id);

    res.json({msg: "Memória apagada no Banco de Dados"});

    } catch (error){
    console.log(error.message)
    res.status(500).send("Error")
   }
}

const updateMemory = async (req, res) => {
    try{
        const {title, description} = req.body;

        let src = null;

        if(req.file) {
            src = `img/${req.file.filename}`
        }

        const memory = await Memoria.findById(req.params.id);

        if(!memory){
            return res.status(400).json({ msg: "Memória não foi encontrada!"})
        }

        const removeOldImage = (memory) => {
            const imagePath = `public/${memory.src}`;

            if(fs.existsSync(imagePath)){
                fs.unlinkSync(imagePath);
                console.log("Imagem antiga removida!");
            }

        }

            //Se enviou nova imagem, remove a antiga
            if (src){
                removeOldImage(memory);
            }


            const updateData = {}

            if(title) updateData.title = title;
            if(description) updateData.description = description;
            if(src) updateData.src = src;

            const updateMemory = await Memoria.findByIdAndUpdate(req.params.id, updateData, { new: true});
            res.json({ updateMemory, msg: "A memoria foi atualizada!"});
        
    } catch(error){
        console.log(error.message);
        res.status(500).send("Error");
    }
}

const alterarFavorito = async(req, res) => {
    try{
        const memory = await Memoria.findById(req.params.id);

         if(!memory){
        return res.status(400).json({msg: "Memória não foi encontrada"})
    }

    memory.favorite = !memory.favorite;

    await memory.save();
    res.json({ msg: "Adicionada aos favoritos", memory});

    } catch(error){
        console.log(error.message);
        res.status(500).send("Error");
    }
}

const adicionarComentario = async (req, res) => {
    try{
        const {name, text} = req.body;

        if(!name || !text){
            return res.status(400).json({msg: "Por favor, preencha todos os campos."});
        }

        const comment = { name, text};

        const memory = await Memoria.findById(req.params.id);

        if(!memory){
        return res.status(400).json({msg: "Memória não foi encontrada"})
        }

        memory.comments.push(comment);

        await memory.save();
        res.json({ msg: "O comentário foi adicionado", memory});

    }  catch(error){
        console.log(error.message);
        res.status(500).send("Error");
    }
}

module.exports = {
    createMemory,
    getMemories,
    getMemory,
    deleteMemory,
    updateMemory,
    alterarFavorito,
    adicionarComentario,
};