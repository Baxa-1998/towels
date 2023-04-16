
import Select from 'react-select'
import { Typography, Box, Stack } from "@mui/material";
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import PropertyDetails from "./property-details";
import { close } from "assets";

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const options =  [
    {
    label: '30-30',
    value: '30-30'
    
},
{
    label: '30-60',
    value: '30-60'
    
},
{
    label: '30-50',
    value: '30-50'
    
},
{
    label: '35-35',
    value: '35-35'
    
},
{
    label: '35-70',
    value: '30-70'
    
},
{
    label: '35-60',
    value: '30-60'
    
},
{
    label: '50-85',
    value: '50-85'
    
},
{
    label: '50-90',
    value: '50-90'
    
},
{
    label: '70-140',
    value: '70-140'
    
},



]
export const OrderModal = ({order, openOrderModal}) =>{
    const { data: user } = useGetIdentity();
    const shouldRenderHeader = true; // since we are using the dark/light toggle; we don't need to check if user is logged in or not.
  
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_xwppdba', 'template_z6j4wwf', form.current, 'KEU8NfLQIl6K9JJWC')
        .then((result) => {
            console.log(result.text);
            console.log('succses');
        }, (error) => {
            console.log(error.text);
        });
    };
    function refreshPage() {
        setTimeout(()=>{
            window.location.reload(false);
            alert("Заказ отправлен")

        },2000)
    
      }
      

    const navigate = useNavigate();
   
    const { queryResult } = useShow();
    const { mutate } = useDelete();
    const { id } = useParams();

  
  
 
    const { data, isLoading, isError } = queryResult;
  
    const propertyDetails = data?.data ?? {};

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (isError) {
        return <div>Что-то пошло не так!</div>;
    }

    return (
        <div className={`order__wrapper ${order ? 'show' : ''}`}>
               <img  style={{width: '35px', height: '35px', marginLeft: '90%', cursor: 'pointer',}} onClick={()=>openOrderModal()} className="order__close" src={close} alt="close" />
            <div className="order__main">
            <form ref={form} onSubmit={sendEmail}>
            {/* propertyDetails.creator.name */}
            

            <label htmlFor="">Имя</label>
            <input type="text" name='user_name' value={user?.name} />
               
        <input style={{width: '100%', height: '200px', borderRadius: '12px'}} type="image" src={propertyDetails.photo} />
           
            <label style={{fontWeight: 600, fontSize: "20px", marginTop: "10px"}} htmlFor="">Дизайн</label>
               <input name='towel_code' type="text" value={propertyDetails.title} />
            
               <label style={{fontWeight: 600, fontSize: "20px", marginTop: "10px"}} htmlFor="">GSM</label>
               <input type="text" name='towel_gsm' value={propertyDetails.price} />
               <label htmlFor="">Размер</label>
              <Select required name='towel_size' options={options}/>
               <label style={{fontWeight: 600, fontSize: "20px", marginTop: "10px"}} htmlFor="">Количество</label>
               <input type="number" name='towel_count' />
      
              <label style={{fontWeight: 600, fontSize: "20px", marginTop: "10px"}} htmlFor="">Введите ваш emal</label>
              <input type="email" name='user_email' required/>
            <input onClick={()=> refreshPage()} className='inp__btn' type="submit" value="Отправить" />
           

            

         
              
            </form>
            </div>
          

        </div>
    )
}