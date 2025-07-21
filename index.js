const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');




// Load environment variables
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


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
    const submissionsCollection = db.collection("submissions");
    const paymentCollection = db.collection("payments");
    const withdrawalCollection = db.collection("withdrawals");

    app.get('/users/role/:email', async (req, res) => {
        const email = req.params.email;
        const user = await usersCollection.findOne({ email });
        res.send({ role: user?.role });
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
            buyer_name: buyer.name,
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

    // GET: Get payment history by user email
    app.get('/payments', async (req, res) => {
        try {
            const userEmail = req.query.email;

            // if (req.decoded.email !== userEmail) {
            // return res.status(403).send({ message: 'Forbidden access' });
            // }

            const query = { email: userEmail };
            const options = { sort: { paid_at: -1 } };

            const payments = await paymentCollection.find(query, options).toArray();

            res.send(payments);
        } catch (error) {
            console.error('Error fetching payment history:', error);
            res.status(500).send({ message: 'Failed to get payments' });
        }
    });



    //POST: Record payment and update parcel status
    app.post('/payments', async (req,res)=>{
      try{
        const { email, amount, coins, paymentMethod, transactionId } = req.body;

        if(!email || !amount){
            return res.status(400).send({message: 'Email and amount are required'});
        }

        // 2. Insert payment record
        const paymentDoc = {
            email,
            amount,
            coins,
            paymentMethod,
            transactionId,
            paid_at_string: new Date().toISOString(),
            paid_at: new Date(),
        };

        const paymentResult = await paymentCollection.insertOne(paymentDoc);

        // Step 3: Increase coins in user's collection
        const updateResult = await usersCollection.updateOne(
            { email },
            { $inc: { coins: coins } } 
        );

        return res.status(201).send({
          message: 'Payment recorded and parcel marked as paid',
          insertedId: paymentResult.insertedId,
        });
      }catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).send({ message: 'Failed to process payment' });
      }
    });


    app.post('/create-payment-intent', async (req,res) => {
      const amountInCents = req.body.amountInCents;
      try{
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amountInCents,
          currency: 'usd',
          payment_method_types: ['card'],
        });
        res.json({
          clientSecret: paymentIntent.client_secret
        });
      }catch(error){
        res.status(500).json({error: MongoExpiredSessionError.message});
      }
    });




    app.get("/buyer/stats", async (req, res) => {
        const email = req.query.email;
        try {
            const tasks = await tasksCollection.find({ buyer_email: email }).toArray();

            const totalTasks = tasks.length;
            const pendingWorkers = tasks.reduce(
            (sum, task) => sum + Number(task.required_workers || 0),
            0
            );

            const payments = await paymentCollection.find({ email }).toArray();
            const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount), 0);

            res.send({ totalTasks, pendingWorkers, totalPaid });
        } catch (err) {
            console.error("Stats error:", err);
            res.status(500).send({ message: "Failed to fetch buyer stats" });
        }
    });

    app.get("/buyer/pendingSubmissions", async (req, res) => {
        const email = req.query.email;
        try {
            const buyerTasks = await tasksCollection
            .find({ buyer_email: email })
            .project({ _id: 1, task_title: 1 })
            .toArray();

            const taskIds = buyerTasks.map((t) => t._id.toString());

            const submissions = await submissionsCollection
            .find({ task_id: { $in: taskIds }, status: "pending" })
            .toArray();

            const enriched = submissions.map((s) => {
            const task = buyerTasks.find((t) => t._id.toString() === s.task_id);
            return {
                ...s,
                task_title: task?.task_title || "Untitled",
            };
            });

            res.send(enriched);
        } catch (error) {
            console.error("Pending submissions error:", error);
            res.status(500).send({ message: "Failed to load submissions" });
        }
    });


    app.patch("/buyer/approveSubmission/:id", async (req, res) => {
        const submissionId = req.params.id;
        const { workerEmail, coins } = req.body;

        try {
            await submissionsCollection.updateOne(
            { _id: new ObjectId(submissionId) },
            { $set: { status: "approved" } }
            );

            await usersCollection.updateOne(
            { email: workerEmail },
            { $inc: { coins: coins } }
            );

            res.send({ success: true });
        } catch (err) {
            console.error("Approval error:", err);
            res.status(500).send({ success: false });
        }
    });


    app.patch("/buyer/rejectSubmission/:id", async (req, res) => {
        const submissionId = req.params.id;
        const { taskId } = req.body;

        try {
            await submissionsCollection.updateOne(
            { _id: new ObjectId(submissionId) },
            { $set: { status: "rejected" } }
            );

            await tasksCollection.updateOne(
            { _id: new ObjectId(taskId) },
            { $inc: { required_workers: 1 } }
            );

            res.send({ success: true });
        } catch (err) {
            console.error("Reject error:", err);
            res.status(500).send({ success: false });
        }
    });


     // ==============================
    // ➕ Worker part
    // ==============================

    app.get('/available-tasks', async (req, res) => {
        try {
            const tasks = await tasksCollection.find({ required_workers: { $gt: 0 } }).toArray();
            res.send(tasks);
        } catch (error) {
            res.status(500).send({ message: "Failed to fetch tasks" });
        }
    });

    app.get('/task/:id', async (req, res) => {
            const { id } = req.params;

            try {
                const task = await tasksCollection.findOne({ _id: new ObjectId(id) });

                if (!task) {
                return res.status(404).json({ message: "Task not found" });
                }

                const buyer = await usersCollection.findOne({ email: task.buyer_email });

                const taskWithBuyerName = {
                ...task,
                buyer_name: buyer?.name || task.buyer_email, // fallback if name missing
                };

                res.send(taskWithBuyerName);
            } catch (err) {
                console.error("Task fetch error:", err);
                res.status(500).json({ message: "Task fetch failed" });
            }
        });


    app.post('/submit-task', async (req, res) => {
        const submission = req.body;
        try {
            // Fetch worker and buyer details
            const worker = await usersCollection.findOne({ email: submission.worker_email });
            const buyer = await usersCollection.findOne({ email: submission.buyer_email });

            // Construct full submission payload
            const fullSubmission = {
            ...submission,
            worker_name: worker?.name || submission.worker_email,
            buyer_name: buyer?.name || submission.buyer_email,
            submittedAt: new Date()
            };

            // Insert into collection
            await submissionsCollection.insertOne(fullSubmission);

            // Decrement available workers for task
            await tasksCollection.updateOne(
            { _id: new ObjectId(submission.task_id) },
            { $inc: { required_workers: -1 } }
            );

            res.json({ success: true, message: "Submission saved" });
        } catch (error) {
            console.error("Submission error:", error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    });

    app.get('/my-submissions/:email', async (req, res) => {
        const { email } = req.params;
        try {
            const submissions = await submissionsCollection
            .find({ worker_email: email })
            .sort({ submittedAt: -1 }) // Newest first
            .toArray();

            res.json(submissions);
        } catch (error) {
            console.error("My submissions fetch error:", error);
            res.status(500).json({ message: "Failed to fetch submissions" });
        }
    });

    app.get("/worker/stats", async (req, res) => {
        const email = req.query.email;
        try {
            const all = await submissionsCollection.find({ worker_email: email }).toArray();

            const totalSubmissions = all.length;
            const pendingCount = all.filter((s) => s.status === "pending").length;
            const totalEarnings = all
            .filter((s) => s.status === "approved")
            .reduce((sum, s) => sum + Number(s.payable_amount || 0), 0);

            res.send({ totalSubmissions, pendingCount, totalEarnings });
        } catch (err) {
            console.error("Worker stats error:", err);
            res.status(500).send({ message: "Stats fetch failed" });
        }
    });

    app.get("/worker/approvedSubmissions", async (req, res) => {
        const email = req.query.email;
        try {
            const subs = await submissionsCollection
            .find({ worker_email: email, status: "approved" })
            .toArray();

            const enriched = await Promise.all(
            subs.map(async (sub) => {
                const task = await tasksCollection.findOne({ _id: new ObjectId(sub.task_id) });
                return {
                ...sub,
                task_title: task?.task_title || "Untitled",
                buyer_name: task?.buyer_name || "Unknown",
                };
            })
            );
            res.send(enriched);
        } catch (err) {
            console.error("Approved submissions error:", err);
            res.status(500).send({ message: "Failed to fetch approved submissions" });
        }
    });

    //withdrawals tk for worker part

    app.get("/withdrawals", async (req, res) => {
        const email = req.query.email;
        try {
            const history = await withdrawalCollection
            .find({ worker_email: email })
            .sort({ withdraw_date: -1 })
            .toArray();
            res.send(history);
        } catch (error) {
            console.error("Fetch withdrawals error:", error);
            res.status(500).send({ message: "Failed to get withdrawals" });
        }
    });

    app.post("/withdrawals", async (req, res) => {
        try {
            const {
            worker_email,
            worker_name,
            withdrawal_coin,
            withdrawal_amount,
            payment_system,
            account_number,
            status,
            withdraw_date,
            } = req.body;

            if (typeof withdrawal_coin !== "number" || withdrawal_coin < 200 || withdrawal_coin % 20 !== 0) {
            return res.status(400).json({ message: "Minimum 200 coins required. Withdrawal must be divisible by 20." });
            }

            const worker = await usersCollection.findOne({ email: worker_email });
            if (!worker || worker.coins < withdrawal_coin) {
            return res.status(400).json({ message: "Insufficient coins" });
            }

            await usersCollection.updateOne(
            { email: worker_email },
            { $inc: { coins: -withdrawal_coin } }
            );

            const doc = {
            worker_email,
            worker_name,
            withdrawal_coin,
            withdrawal_amount,
            payment_system,
            account_number,
            status: status || "pending",
            withdraw_date: withdraw_date || new Date(),
            };

            await withdrawalCollection.insertOne(doc);
            res.status(201).json({ success: true, message: "Withdrawal submitted" });
        } catch (error) {
            console.error("Withdrawal error:", error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    });

    //admin role play
    app.get("/admin/searchUsers", async (req, res) => {
        const query = req.query.query || "";

        try {
            const searchRegex = new RegExp(query, "i"); // case-insensitive match

            const users = await usersCollection
            .find({
                $or: [
                { name: searchRegex },
                { email: searchRegex }
                ]
            })
            .limit(10)
            .toArray();

            res.send(users);
        } catch (err) {
            console.error("User search failed:", err);
            res.status(500).send({ message: "Failed to fetch users" });
        }
    });

    app.patch("/admin/updateUserRole/:email", async (req, res) => {
        const email = req.params.email;
        const newRole = req.body.role;

        try {
            const user = await usersCollection.findOne({ email });

            if (!user) return res.status(404).send({ success: false, message: "User not found" });

            let updateDoc = {};

            if (newRole === "admin") {
            updateDoc = {
                $set: { role: "admin", previousRole: user.role } // store old role
            };
            } else {
            updateDoc = {
                $set: { role: user.previousRole || "worker" }, // fallback to worker
                $unset: { previousRole: "" } // cleanup
            };
            }

            const result = await usersCollection.updateOne({ email }, updateDoc);
            res.send({ success: true, modifiedCount: result.modifiedCount });
        } catch (err) {
            console.error("Role update failed:", err);
            res.status(500).send({ success: false, message: "Server error" });
        }
    });

    app.get("/admin/tasks", async (req, res) => {
        try {
            const tasks = await tasksCollection.find().sort({ createdAt: -1 }).toArray();
            res.send(tasks);
        } catch (err) {
            console.error("Fetch tasks failed:", err);
            res.status(500).send({ message: "Failed to load tasks" });
        }
    });

    app.delete("/admin/tasks/:id", async (req, res) => {
        const id = req.params.id;

        try {
            const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) });
            res.send(result);
        } catch (err) {
            console.error("Task deletion failed:", err);
            res.status(500).send({ message: "Failed to delete task" });
        }
    });

    app.get("/admin/stats", async (req, res) => {
        try {
            const buyers = await usersCollection.countDocuments({ role: "buyer" });
            const workers = await usersCollection.countDocuments({ role: "worker" });

            const users = await usersCollection.find().toArray();
            const totalCoins = users.reduce((sum, user) => sum + (user.coins || 0), 0);

            const payments = await paymentCollection.find().toArray(); // assuming this exists
            const totalPayments = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

            res.send({
            totalBuyers: buyers,
            totalWorkers: workers,
            totalCoins,
            totalPayments,
            });
        } catch (err) {
            res.status(500).send({ message: "Stats load failed" });
        }
    });

    app.get("/admin/pendingWithdrawals", async (req, res) => {
        try {
            const pending = await withdrawalCollection
            .find({ status: "pending" })
            .sort({ withdraw_date: -1 })
            .toArray();

            res.send(pending);
        } catch (err) {
            res.status(500).send({ message: "Withdrawal fetch failed" });
        }
    });

    app.patch("/admin/approveWithdrawal/:id", async (req, res) => {
        const id = req.params.id;
        const { email, coins } = req.body;

        try {
            // Update withdrawal status
            const withdrawalUpdate = await withdrawalCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { status: "approved" } }
            );

            // Decrease worker's coin balance
            const coinUpdate = await usersCollection.updateOne(
            { email },
            { $inc: { coins: -coins } }
            );

            res.send({ success: true });
        } catch (err) {
            console.error("Approval failed:", err);
            res.status(500).send({ success: false, message: "Approval failed" });
        }
    });


    //top workers
    app.get("/top-workers", async (req, res) => {
        try {
            const topWorkers = await usersCollection
            .find({ role: "worker" })
            .sort({ coins: -1 })
            .limit(6)
            .project({ name: 1, email: 1, photoURL: 1, coins: 1 }) // select only needed fields
            .toArray();

            res.send(topWorkers);
        } catch (err) {
            console.error("Top workers fetch error:", err);
            res.status(500).send({ message: "Failed to load top workers" });
        }
    });

    // LiveStats
    app.get("/platform-stats", async (req, res) => {
        try {
            const users = await usersCollection.countDocuments();
            const todayStart = new Date();
            todayStart.setHours(0, 0, 0, 0);

            const tasksCompletedToday = await submissionsCollection.countDocuments({
            submit_date: { $gte: todayStart }
            });

            const userList = await usersCollection.find().toArray();
            const totalCoins = userList.reduce((sum, u) => sum + (u.coins || 0), 0);

            res.send({
            users,
            tasksToday: tasksCompletedToday,
            totalCoins
            });
        } catch (err) {
            console.error("Platform stats error:", err);
            res.status(500).send({ message: "Failed to fetch stats" });
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
