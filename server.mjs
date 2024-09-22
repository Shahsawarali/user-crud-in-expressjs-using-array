import express from "express"
const app = express()
app.use(express.json())

const PORT = 3000
const users = [
    {id:1,name:'nobody',email:'nobody@gmail.com'},
    {id:2,name:'somebody',email:'somebody@gmail.com'},
]

app.get('/api/users',(req,res)=>{
    res.json({message:'All user Fetched',users})
})
app.post('/api/users',(req,res)=>{
    const newItem = {
        id:users.length+1,
        name:"anybody",
        email:"anybody@gmail.com"
    }
    users.push(newItem)
    res.json({message:"User Created!", newItem})
})

app.put('/api/user/:id',(req,res)=>{
    const userId = parseInt(req.params.id)
    const userIndex = users.findIndex(user=>user.id === userId)
    if (users !== -1) {
        const updatedUser = { ...users[userIndex], ...req.body }
        users[userIndex] = updatedUser
        res.json(updatedUser)
    } else {
        res.status(404).json({ message: 'User not found' })
    }
});

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const userIndex = users.findIndex(u => u.id === id)
    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1)
        res.json(deletedUser)
    } else {
        res.status(404).json({ message: 'User not found' })
    }
});


app.listen(PORT,console.log(`server is listening here: http://localhost:${PORT}`))