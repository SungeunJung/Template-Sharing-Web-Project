import React, { useState } from 'react';
import { Typography, Button, Form, message, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import axios from 'axios';
//import { response } from 'express';

const { Title } = Typography;
const { TextArea } = Input;

const Categories = [
    { key:1, value: "다이어리" },
    { key:2, value: "플래너" },
    { key:3, value: "트래커" },
    { key:4, value: "노트" },
]
const Detail_1 = [
    { key:1, value: "날짜형" },
    { key:2, value: "만년형" },
    { key:3, value: "육아일기" },
]
const Detail_2 = [
    { key:1, value: "스터디플래너" },
    { key:2, value: "데일리" },
    { key:3, value: "위클리" },
]
const Detail_3 = [
    { key:1, value: "무드트래커" },
    { key:2, value: "해빗트래커" },
]
const Detail_4 = [
    { key:1, value: "독서노트" },
    { key:2, value: "필사노트" },
    { key:3, value: "수학노트" },
]
var Detail = Detail_1;


function UploadTemplatePage(props) {
    const [Images, setImages] = useState([])
    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [CategoryValue, setCategoryValue] = useState(1)
    const [DetailValue, setDetailValue] = useState(1)
    
    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }
    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }
    const onCategorySelectChange = (event) => {
        setCategoryValue(event.currentTarget.value)
        switch (event.currentTarget.value) {
            case '1': 
                Detail = Detail_1.slice();
                setDetailValue(1);
                break;
            case '2': 
                Detail = Detail_2.slice();
                setDetailValue(1);
                break;
            case '3': 
                Detail = Detail_3.slice();
                setDetailValue(1);
                break;
            case '4': 
                Detail = Detail_4.slice();
                setDetailValue(1);
                break; 
            default:
                break;
        }
    }
    const onDetailSelectChange = (event) => {
        setDetailValue(event.currentTarget.value)
    }
    const updateImages = (newImages) =>{
        console.log(newImages)
        setImages(newImages)
    }
    const onSubmit = (event) => {
        event.preventDefault()

        if(!TitleValue || !DescriptionValue || Images.length == 0) {
            return alert('Fill all the fields first!')
        }

        const variables = {
            writer: props.user.userData._id,
            nickname: props.user.userData.nickname,
            title: TitleValue,
            description: DescriptionValue,
            images: Images,
            category: CategoryValue,
            detail: DetailValue,
        }

        console.log(Images)

        axios.post('/api/template/uploadTemplate', variables)
            .then(response => {
                if(response.data.success) {
                    alert('Template Successfully Uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload Template')
                }
            })
    }

    

    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto' }}>
            <div style={{ textAlign:'center', marginBottom:'2rem' }}>
                <Title level={2}>Upload Template</Title>
            </div>

            <Form onSubmit={onSubmit} >
                {/*DropZone*/}
                <FileUpload refreshFunction={updateImages}/>
                <br/>
                <br/>
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br/>
                <br/>
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br/>
                <br/>
                <label>Category </label>
                <select onChange={onCategorySelectChange}>
                    {Categories.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <label> Detail </label>
                <select onChange={onDetailSelectChange}>
                    {Detail.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br/>
                <br/>
                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default UploadTemplatePage
