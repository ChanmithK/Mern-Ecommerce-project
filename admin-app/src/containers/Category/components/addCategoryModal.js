import React from "react";
import Input from "../../../components/UI/Input";
import Modal from '../../../components/UI/Modal';
import { Col, Row } from "react-bootstrap";

const AddCategoryModal = (props) => {

    const {
        show,
        handleClose,
        modalTitle,
        categoryList,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        handleCategoryImage,
        onSubmit

    } = props;

    return(
      <Modal
      show={show}
      handleClose ={handleClose}
      modalTitle = {modalTitle}
      onSubmit = {onSubmit}
      >  
      <Row>
          <Col>
          <Input 
                value={categoryName}
                placeholder = {`Category Name`}
                onChange={(e)=>setCategoryName(e.target.value)}
            />
          </Col>
          <Col>
          <select 
            className="form-control" 
            value ={parentCategoryId}
            onChange={(e)=> setParentCategoryId(e.target.value)}>
                <option>select category</option>
                {
                    categoryList.map(option =>
                        <option key={option.value} value={option.value}>{option.name}</option>)
                }
            </select>
          </Col>
      </Row>
      <br></br>
      <Row>
          <Col>
          <input
                type="file"
                name="categoryImage"
                onChange ={handleCategoryImage}
            />
          </Col>
      </Row>
      </Modal> 
    )
  }

  export default AddCategoryModal;