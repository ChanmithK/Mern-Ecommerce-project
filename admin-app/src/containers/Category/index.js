import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getAllCategory, updateCategories, deleteCategories as deleteCategoriesAction } from "../../actions";
import Layout from "../../components/Layout";
import Modal from '../../components/UI/Modal';
import CheckboxTree from "react-checkbox-tree";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { IoIosCheckboxOutline, IoIosCheckbox, IoIosArrowForward, IoIosArrowDown, IoIosAddCircleOutline, IoIosTrash, IoIosMedkit } from "react-icons/io";
import UpdateCategoriesModal from "./components/UpdateCategoriesModal";
import AddCategoryModal from "./components/addCategoryModal";
import './style.css';


export default function Category() {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [categoryName,setCategoryName] =useState('');
  const [parentCategoryId,setParentCategoryId] =useState('');
  const [categoryImage,setCategoryImage] =useState('');
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);


  ////////////////////Now this code part in the App.js 24 line//////////
  // useEffect(() => {
  //   dispatch(getAllCategory()); 
  // }, []);

  useEffect(() => {

    if(!category.loading){
      setShow(false);
    }

  },[category.loading])

  const handleClose = () => {
    const form = new FormData();
    
  
    if(categoryName === ""){
      alert('Name is required');
      setShow(false);
      return;
    }

    form.append('name',categoryName);
    form.append('parentId',parentCategoryId);
    form.append('categoryImage',categoryImage);
    dispatch(addCategory(form)); 
    setCategoryName('');
    setParentCategoryId('');
  
    setShow(false);
    
  } 
  
  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category__ of categories) {
      myCategories.push(
        {
          label: category__.name,
          value:category__._id,
          children:category__.children.length > 0 && renderCategories(category__.children)
        }
      );
    }
    return myCategories;
  };

  //This fuction for <select> <option></option> </select> part
  const createCategoryList = (categories, options =[]) => {
      for(let category of categories){
          options.push({ 
            value: category._id, 
            name: category.name , 
            parentId: category.parentId , 
            type: category.type
          });
          if(category.children.length > 0){
              createCategoryList(category.children, options)
          }
      }
      return options;
  }

  const handleCategoryImage = (e) =>{
      setCategoryImage(e.target.files[0]);
  }

  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
    
  }

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 && checked.forEach((categoryId, index) => {
      const category = categories.find((category, _index) => categoryId=== category.value);
      category && checkedArray.push(category)
    })
    expanded.length > 0 && expanded.forEach((categoryId, index) => {
      const category = categories.find((category, _index) => categoryId=== category.value);
      category && expandedArray.push(category)
    })
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  }

  const handleCategoryInput = (key, value, index, type) => {
    if(type ===  "checked"){
      const updatedCheckedArray = checkedArray.map((item, _index) => index === _index ? { ...item, [key]: value} : item);
      setCheckedArray(updatedCheckedArray);
    }else if(type === "expanded" ){
      const updatedExpandedArray = expandedArray.map((item, _index) => index === _index ? { ...item, [key]: value} : item);
      setExpandedArray(updatedExpandedArray);
    }
  }
  
  const updateCategoriesForm = () => {

    const form = new FormData();

    expandedArray.forEach((item,index) => (
      form.append('_id', item.value),
      form.append('name', item.name),
      form.append('parentId', item.parentId ? item.parentId: ""),
      form.append('type', item.type)
    ))

    checkedArray.forEach((item,index) => (
      form.append('_id', item.value),
      form.append('name', item.name),
      form.append('parentId', item.parentId ? item.parentId: ""),
      form.append('type', item.type)
    ))

    dispatch(updateCategories(form));
    setUpdateCategoryModal(false)
  }

  const deleteCategory = () =>{
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  }

  const DeleteCategoriesYes = () => {
    const checkedIdsArray = checkedArray.map((item, index)=> ({_id: item.value}));
    const expandedIdsArray = checkedArray.map((item, index)=> ({_id: item.value}));
    const idsArray = expandedIdsArray.concat(checkedIdsArray);
    
    if(checkedIdsArray.length > 0){
      dispatch(deleteCategoriesAction(checkedIdsArray))
      .then(result => {
        if(result){
          dispatch(getAllCategory())
          setDeleteCategoryModal(false)
        }
      })
    }
    
    setDeleteCategoryModal(false);

  }

  const renderDeleteCategoryModal = () => {
    return(
      <Modal
        modalTitle="Confirm"
        show = {deleteCategoryModal}
        handleClose = {()=> setDeleteCategoryModal(false)}
        buttons = {[
          {
            label: 'No',
            color: 'primary',
            onClick: () => {
              alert('no');
            }
          },
          {
            label: 'Yes',
            color: 'danger',
            onClick: DeleteCategoriesYes
          }
        ]}
        >
  
        <h5>Expanded</h5>
        {expandedArray.map((item,index) => <span key={index}>{item.name}</span>)}
        <h5>Checked</h5>
        {checkedArray.map((item,index) => <span key={index}>{item.name}</span>)}
      </Modal>
    )
  }

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <div className = "buttonContainer">
                <button onClick={handleShow} type="button"  class="btn btn-primary"><IoIosAddCircleOutline/> Add</button>
                <button onClick={deleteCategory}  type="button" class="btn btn-primary"><IoIosTrash/>  Delete</button>
                <button onClick={updateCategory} type="button" class="btn btn-primary"><IoIosMedkit/> Edit</button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
             <CheckboxTree
                nodes={renderCategories(category.categories)}
                checked={checked}
                expanded={expanded}
                onCheck={checked => setChecked( checked )}
                onExpand={expanded => setExpanded(expanded)}
                icons ={{
                  check: <IoIosCheckbox/>,
                  uncheck: <IoIosCheckboxOutline/>,
                  halfCheck: <IoIosCheckbox/>,
                  expandClose: <IoIosArrowForward/>,
                  expandOpen: <IoIosArrowDown/>,
                }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
          
          </Col>
        </Row>
      </Container>

      <AddCategoryModal 
        show={show}
        handleClose ={()=> setShow(false)}
        onSubmit={handleClose}
        modalTitle = {'Add New Category'}
        categoryList = {createCategoryList(category.categories)}
        categoryName = {categoryName}
        setCategoryName = {setCategoryName}
        parentCategoryId = {parentCategoryId}
        setParentCategoryId = {setParentCategoryId}
        handleCategoryImage = {handleCategoryImage}
      />
      <UpdateCategoriesModal 
         show={updateCategoryModal}
         handleClose ={()=>setUpdateCategoryModal(false)}
         onSubmit={updateCategoriesForm}
         modalTitle = {'Update Categories'}
         size = "lg"
         expandedArray = {expandedArray}
         checkedArray = {checkedArray}
         handleCategoryInput = {handleCategoryInput}
         categoryList = {createCategoryList(category.categories)}
      />
      {renderDeleteCategoryModal()}
    </Layout>
  );
}
