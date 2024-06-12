/* eslint-disable react/prop-types */
// HOOKS
import {useState, useEffect} from "react"
import { 
  Input, 
  VStack,  
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  TableContainer,
  Text,
  Center
} from '@chakra-ui/react'
import convertToRupiah from "./convertRupiah"
import useStore from "./zustand/store"

// Array of objects Product
const productData = [
  {
    title: "Printer",
    sku: "ELECTRO-001",
    price: 800000,
    stock: 100
  },
  {
    title: "Monitor 144 Hz",
    sku: "ELECTRO-002",
    price: 3500000,
    stock: 80
  },
  {
    title: "CPU WITH PROCESSOR RYZEN 7",
    sku: "ELECTRO-003",
    price: 11000000,
    stock: 20
  },
  {
    title: "KEYBOARD",
    sku: "ELECTRO-004",
    price: 200000,
    stock: 500
  }
]

// FUNCTION COMPONENT
// Render HTML dan CSS
function App() {
  // useState => return array isinya 2
  // 1. State
  // 2. Set State

  // Local State

  // const [products, setProducts] = useState([])
  
  // Global State
  const products = useStore((state) => state.products)
  const setProducts = useStore((state) => state.setProducts)
  
  const [title, setTitle] = useState("")
  const [sku, setSku] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")

  // Mengaplikasikan side effect
  // Pertama kali render
  useEffect(() => {
    setProducts(productData)
  }, [])


  const handleSubmit = () => {

    const newProduct = {
      title,
      sku,
      price,
      stock
    }

    setProducts([...products, newProduct])
    resetForm();
  }

  const resetForm = () => {
    setTitle("")
    setSku("")
    setPrice("")
    setStock("")
  }

  // Syntax HTML dan CSS
  return (
    <>
      <Flex p="3" justifyContent="center">
        {/* INPUT FORM */}
        <VStack p="3">
          <Input placeholder="TITLE" value={title} onChange={(e) => setTitle(e.target.value)}/>
          <Input placeholder="SKU" value={sku}  onChange={(e) => setSku(e.target.value)}/>
          <Input type="number" placeholder="PRICE" value={price}  onChange={(e) => setPrice(e.target.value)}/>
          <Input type="number" placeholder="STOCK" value={stock}  onChange={(e) => setStock(e.target.value)}/>
          <Button onClick={handleSubmit} colorScheme='teal' size="lg">SUBMIT</Button>
        </VStack>

        {/* TABLE */}
        <VStack p="3">
          <TableContainer>
            <Table variant='striped' colorScheme='teal'>
              <Thead>
                <Tr>
                  <Th>TITLE</Th>
                  <Th>SKU</Th>
                  <Th>PRICE</Th>
                  <Th>STOCK</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product, idx) => {
                  return (
                    <Tr key={idx}>
                      <Td>{product.title}</Td>
                      <Td>{product.sku}</Td>
                      <Td>{convertToRupiah(product.price)}</Td>
                      <Td>{product.stock}</Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </Flex>
      
      <Center>
       <Result/>
      </Center>

    </>
  )

}

// NEW Function Component

function Result() {
  const products = useStore((state) => state.products)

  return (
    <>
      <Text fontSize='5xl'>TOTAL PRODUCTS: {products.length}</Text>
    </>
  )
}

export default App
