import React, { useEffect, useState } from 'react'
import Modal from '../../components/UI/Modal'
import Layout from '../../components/Layout'
import { Col, Container, Row } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import linearCategories from '../../helpers/linearCategories';
import { useDispatch, useSelector } from 'react-redux';
import { createPage } from '../../actions';


export default function Page() {
    const [createModal , setCreateModal] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ banners, setBanners] = useState([]);
    const [products, setProducts ] = useState([]);
    const category = useSelector(state=> state.category);
    const [ categories , setCategories] = useState([]);
    const [ categoryId , setCategoryId] = useState('');
    const [ type , setType] = useState('');
    const dispatch = useDispatch();
    const page = useSelector(state => state.page);


    useEffect(() => {
        setCategories(linearCategories(category.categories)); // This will get all the select part categories with setCategories and put in to categories (you can see in the useState)
    },[category.categories]);

    //This effect done after save the page
    useEffect(() => {
        console.log(page);
        if(!page.loading){
            setCreateModal(false);
            setTitle('');
            setCategoryId('');
            setDescription('');
            setProducts([]);
            setBanners([]);
        }
    },[page]);


    const onCategoryChange = (e) =>{
        const category = categories.find(category => category._id === e.target.value); //This part will find the relevant category and after that with our select category list, find the realavant type of that category (helpers -> linearCategory -> type: category.type)
        setCategoryId(e.target.value);
        setType(category.type); // After that we set the type like this.
    }

    const handleBannerImages = (e) =>{
       console.log(e);
       setBanners([...banners, e.target.files[0]]);
    }

    const handleProductImages = (e) =>{
        console.log(e);
        setProducts([...products, e.target.files[0]]);
     }

     const submitPageForm = (e) => {
        //e.target.preventDefault();

        if(title === ""){
            alert('Title is required');
            setCreateModal(false);
            return;
        }
        
        const form = new FormData();
        form.append('title', title);
        form.append('description', description);
        form.append('category', categoryId);
        form.append('type',type);
        banners.forEach((banner, index) =>{
            form.append('banners', banner);
        });
        products.forEach((product, index) =>{
            form.append('products', product);
        });
        dispatch(createPage(form));
        // setCreateModal(false);
     }

    const renderCreatePageModal = () =>{
        return(
            <Modal
            show = {createModal}
            modalTitle = {'Create New Page'}
            handleClose = {()=> setCreateModal(false)}
            onSubmit = {submitPageForm}
            >
                <Container>
                <Row>
                    <Col>
                        <select
                            className="form-control form-control-sm"
                            value={categoryId}
                            onChange={onCategoryChange}
                        >
                            <option value="">select category</option>
                            {
                               categories.map(cat => 
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    )
                            }

                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                        value={title}
                        onChange = {(e) => setTitle(e.target.value)}
                        placeholder = {'Page Title'}
                        className="form-control-sm"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                        value={description}
                        onChange = {(e) => setDescription(e.target.value)}
                        placeholder = {'Page Description'}
                        className="form-control-sm"
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <input 
                            type="file"
                            name="banners"
                            onChange={handleBannerImages}
                            className="form-control"
                        />
                    </Col>
                </Row>
                {
                    banners.length > 0 ? banners.map((banner,index)=>
                        <Row key={index}> 
                        <Col>{banner.name}</Col>
                        </Row>
                    ):null
                }

                <Row>
                    <Col>
                        <input 
                            type="file"
                            name="products"
                            onChange={handleProductImages}
                            className="form-control"
                        />
                    </Col>
                </Row>
                {
                    products.length > 0 ? products.map((product,index)=>
                        <Row key={index}> 
                        <Col>{product.name}</Col>
                        </Row>
                    ):null
                }

                </Container>
            </Modal>
        );
    }
    return (
        <Layout sidebar>
            {renderCreatePageModal()}
            <button onClick={()=> setCreateModal(true)}>Craete Page</button>
        </Layout>
    )
}
