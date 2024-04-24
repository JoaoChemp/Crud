import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    Input,
    Box,
    FormLabel
} from "@chakra-ui/react"
import { useState } from "react"

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
    const [ name, setName ] = useState(dataEdit.name || "");
    const [email, setEmail ] = useState(dataEdit.email || "");

    const handleSave = () => {
        if(!name || !email) return;  /* Verificar campo vazio */

        if(emailAlreadyExists()) return alert("Email já Cadastrado")   /* Verificar se o email já está cadastrado */

        if (Object.keys(dataEdit).length) {   /* Verificar se é uma edição de cadastro */
            data[dataEdit.index] = { name, email}
        }

        const newDataArray = !Object.keys(dataEdit).length 
        ? [...(data ? data : []), { name, email }]  /* Se for edição vai pegar todo o email cadastrado e adicionar o novo */
        : [...(data ? data : [])]
        
        localStorage.setItem("cad_cliente", JSON.stringify(newDataArray)) /* Criar um localStorage no navegador */

        setData(newDataArray) 

        onClose() /* Fechar o Modal */
    }
    
    const emailAlreadyExists = () => {
        if(dataEdit.email !== email && data?.length) {
            return data.find((item) => item.email === email)
        }
    }
    
    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose}>  {/* Cria um Modal com controles para verificar se está aberto ou fechado */}
            <ModalOverlay /> {/* Um Modal para escurecer a tela de fundo */}
            <ModalContent>  {/* Conteúdo */}
                <ModalHeader>Cadastro de clientes</ModalHeader> {/* Cabeça do conteúdo */}
                <ModalCloseButton /> {/* Botão para fechar o Modal */}
                <ModalBody>  {/* Corpo do conteúdo */}
                    <FormControl display="flex" flexDir="column" gap={4}>
                        <Box>
                            <FormLabel>Nome</FormLabel>
                            <Input type="text" value={name} onChange={e => setName(e.target.value)} />
                        </Box>
                        <Box>
                            <FormLabel>E-mail</FormLabel>
                            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </Box>
                    </FormControl>
                </ModalBody>
                <ModalFooter justifyContent="start">
                    <Button colorScheme="green" mr={3} onClick={handleSave}>
                        SALVAR
                    </Button>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                        CANCELAR
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}

export default ModalComp;