import  {userServices} from '../services/userServices.js';

export const userControllers = {
    async getUsers(req, res){
        try{
            const users = await userServices.getAllUsers();
            res.status(200).json({
                succes: true,
                data:users
            })
        }catch(error){
            res.status(500).json({
                succes: false,
                message: error.message
            })
        }
    },

    async createUser (req, res){
        try{
            const {email, name}= req.body;
            //Validacion basica
            if(!email || !name){
                return res.status(400).json({
                    succes:false,
                    message:'Email y nombre son obligatorios'
                });
            }
            const newUser = await userServices.createUser({email, name});
            res.status(201).json({
                succes:true,
                data: newUser,
                message: 'Usuario creado correctamente'
            });
        }catch(error){
            res.status(500).json({
                sucess:false,
                message:error.message
            })
        }
    },

    async updateUser(req, res){
        try{
            const {id} = req.params;
            const updateData = req.body;

            const updatedUser = await userServices.updateUser(id, updateData);
      
            res.status(200).json({
                success:true,
                data:updatedUser,
                message: 'Usuario actualizado exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success:false,
                message:error.message
            });
        }
    },

    async deleteUser(req, res){
        try{
            const {name} = req.params;
            const deletedData = req.body;

            const deletedUser = await userServices.deleteUser(name, deletedData);

            if(!deletedUser){
                return res.status(404).json({
                    success:false,
                    message: "Usuario no encontrado"
                });
            }
            res.status(200).json({
                success:true,
                data:deletedUser,
                message: "Usuario eliminado correctamente"
            });
        }catch(error){
            res.status(500).json({
                success:false,
                message:error.message
            });
        }
    }
}