const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB URI with environment variables
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sltsi8p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Declare globally so it's accessible outside `run`

async function run() {
  try {
    await client.connect();

    const db = client.db("userDB");
    const usersCollection = db.collection("users");

    const tasksCollection = db.collection("tasks");


    app.get('/users',async(req,res)=>{
        const users = await usersCollection.find().toArray();
        res.send(users);
    });

    //users API
    app.get('/users',async(req,res) => {
        try{
            const userEmail = req.query.email;

            const query = userEmail ? {created_by : userEmail} : {};

            const options = {
                sort: {
                    createdAt: -1
                },
            };

            const users = await usersCollection.find(query,options).
            toArray();
            res.send(users);
        }catch(error){
            console.log('Error fetching users: ', error);
            res.status(500).send({message: 'Failed to get users'});
        }
    });


    // ✅ REGISTER Route
    app.post('/register', async (req, res) => {
        const { name, email, photoURL, role } = req.body;

        if (!name || !email || !photoURL || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        try {
            const existingUser = await usersCollection.findOne({ email });

            if (existingUser) {
            return res.status(409).json({ message: "Email already exists" }); 
            }

            const coins = role === "worker" ? 10 : 50;

            const newUser = {
            name,
            email,
            photoURL,
            role,
            coins,
            createdAt: new Date()
            };

            await usersCollection.insertOne(newUser);

            res.status(201).json({ message: "User registered successfully", user: newUser });
        } catch (error) {
            console.error("Register error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });


    // ✅ Get a user by email
    app.get('/user/:email', async (req, res) => {
        const email = req.params.email;

        try {
            const user = await usersCollection.findOne({ email });

            if (!user) {
            return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(user);
        } catch (error) {
            console.error("Get User Error:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });



    // ==============================
    // ➕ Add Task by Buyer
    // ==============================
    app.get('/my-tasks/:email', async (req, res) => {
        const { email } = req.params;
        try {
            const tasks = await tasksCollection.find({ buyer_email: email }).toArray();
            res.send(tasks);
        } catch (err) {
            res.status(500).json({ message: "Failed to fetch tasks" });
        }
    });



    app.post('/add-task', async (req, res) => {
        try {
            const {
            buyer_email,
            task_title,
            task_detail,
            required_workers,
            payable_amount,
            completion_date,
            submission_info,
            task_image
            } = req.body;

            const required = Number(required_workers);
            const payable = Number(payable_amount);
            const total_payable = required * payable;

            if (
            !buyer_email || !task_title || !task_detail ||
            isNaN(required) || isNaN(payable) || !completion_date ||
            !submission_info || !task_image
            ) {
            return res.status(400).json({ success: false, message: "Missing or invalid fields" });
            }

            const buyer = await usersCollection.findOne({ email: buyer_email });

            if (!buyer) {
            return res.status(404).json({ success: false, message: 'Buyer not found' });
            }

            if (buyer.coins < total_payable) {
            return res.status(400).json({ success: false, message: 'Not enough coins to create this task' });
            }

            const task = {
            buyer_email,
            task_title,
            task_detail,
            required_workers,
            payable_amount,
            completion_date,
            submission_info,
            task_image,
            total_payable,
            createdAt: new Date()
            };

            await tasksCollection.insertOne(task);

            await usersCollection.updateOne(
            { email: buyer_email },
            { $inc: { coins: -total_payable } }
            );

            res.status(201).json({
            success: true,
            message: 'Task added and coins deducted successfully'
            });
        } catch (error) {
            console.error("Add Task Error:", error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    });

    app.post('/refill-coin', async (req, res) => {
        const { email, coins } = req.body;
        try {
            const result = await usersCollection.updateOne({ email }, { $inc: { coins: coins } });
            res.json({ success: true, result });
        } catch (error) {
            res.status(500).json({ success: false, message: "Failed to refill coins" });
        }
    });


    app.delete('/delete-task/:id', async (req, res) => {
        const taskId = req.params.id;

        try {
            const task = await tasksCollection.findOne({ _id: new ObjectId(taskId) });
            if (!task) return res.status(404).json({ success: false, message: "Task not found" });

            await tasksCollection.deleteOne({ _id: new ObjectId(taskId) });

            res.status(200).json({ success: true, message: "Task deleted" });
        } catch (err) {
            res.status(500).json({ success: false, message: "Server error" });
        }
    });

    app.patch('/update-task/:id', async (req, res) => {
        const taskId = req.params.id;
        const updateFields = req.body;

        try {
            const result = await tasksCollection.updateOne(
            { _id: new ObjectId(taskId) },
            { $set: updateFields }
            );
            res.json({ success: true, result });
        } catch (err) {
            res.status(500).json({ success: false, message: "Update failed" });
        }
    });
    

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('🚚 KormoBazaar Server is running!');
});
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
