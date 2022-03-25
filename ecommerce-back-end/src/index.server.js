const express = require('express');
const app = express();
const env = require('dotenv');
const mongoose =require('mongoose');
const path = require('path');
const cors = require('cors');

//environment variable
env.config();

//MongoDB connection
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@e-commerce-site.6mskt.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        ).then(() => {
            console.log('Database Connected !!');
        });
app.listen(process.env.PORT,() =>{
    console.log(`Server in running on port ${process.env.PORT}`);
})

//--------------------------------------------------------------------------

//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const initialDataRoutes = require('./routes/admin/initialData');
const pageRoutes = require('./routes/admin/page');

app.use(cors());
app.use(express.json());
app.use('/public',express.static(path.join(__dirname, 'uploads')));
app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);
app.use('/api',initialDataRoutes);
app.use('/api',pageRoutes);