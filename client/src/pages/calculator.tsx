
import Select from 'react-select'
import {Box, Typography, Stack, TextField, MenuItem,FormControl, FormHelperText,  borderRadius, margin,} from '@pankod/refine-mui'
import React, {useState} from 'react'
import { PropertyCard, CustomButton } from 'components'
import { close, raw, ready } from 'assets'
import { ExitToApp } from '@mui/icons-material'

const options = [
    {
    value: 70,
    label: 70
},
{
    value: 50,
    label: 50
},
{
    value: 30,
    label: 30
},
{
    value: 35,
    label: 35
},

] 
const options2 = [
    {
    value: 140,
    label: 140
},
{
    value: 135,
    label: 135
},
{
    value: 90,
    label: 90
},
{
    value: 85,
    label: 85
},

] 
const typeOfTowel  = [
    {
        value: 'velour',  // 24%
        label: 'Velour'
    },
    {
        value: 'dyed', // 10% 
        label: 'Dyed'
    },
    {
        value: 'yarnDyed', // 2% 
        label: 'YarnDyed'
    },
   
]

const typeofGSM = [
    {
        value: 400,
        label: 400
    },
    {
        value: 450,
        label: 450
    },
    {
        value: 500,
        label: 500
    },
    {
        value: 550,
        label: 550
    },
    {
        value: 600,
        label: 600
    },
    {
        value: 650,
        label: 650
    },
]




const Calсulator = () => {  
 
    const [count, setCount]  = useState('')
    const [width, setWidth] = useState()
    const [length, setLength] = useState()
 
    const [result, setResult] = useState(0)   // State of finish towel
    const [rawResult, setRawResult] = useState(0) 

    const [type, setType] = useState('')
    const [gsm, setGSM] = useState()   
    const [openModal, setOpenModal]=  useState(true)

    function handleModal () {
        setOpenModal (prevState => {
            return !prevState
        })
    }

    //  I get value for width 
    function getValueWidth () {
        // if state is empty then i return null
        return width ? options.find(w => w.value === width): null
    }
       //  I get value for length
    function getValueLength () {
        return length ? options.find(l => l.value === length): null
    }
    // I get value for type

    function getValueType () {
        return type ? typeOfTowel.find(t => t.value === length): null
    }
    function getValueGSM () {
        return gsm ? typeofGSM.find(g => g.value === gsm): null
    }


    function onChange (newValue: any)  {
        setWidth(newValue.value)
  
  
    }
    function onChange2 (newValue: any)  {
    setLength(newValue.value)
  
  
    }
    function onChange3 (newValue: any)  {
        setType(newValue.value)
      
      
        }
        function onChange4 (newValue: any)  {
            setGSM(newValue.value)
          
          
            }

    function showResult () {
        let finishResult;

        if(width !== undefined && length !== undefined && gsm !== undefined && count !== '' ) {
            handleModal()      
            let a = Math.floor(width * length * gsm / 10000 * parseInt(count)) 
 
            if(type === 'velour'){ // if chosen velour 
              finishResult = Math.floor(a * 24 / 100 + a)
              if(result !==  undefined) {
                setResult(finishResult)
                setRawResult(a)

              }
            }
            if(type === 'dyed'){
                finishResult =  a * 10 / 100 + a
                if(result !== undefined) {
                    setResult(finishResult)
                    setRawResult(a)
                }
            }
            if(type === 'yarnDyed'){
                finishResult = a * 2 / 100 + a 
                if(result !== undefined) {
                    setResult(finishResult)
                    setRawResult(a)
                }
            }            

        }else{
            alert('Заполните все поля')
        }
       
        
    }
    const ModalGSM = () =>{
        return (
            <div  className={`modalGSM__wrapper ${openModal ? 'active' : ''}`}>
                <img onClick={handleModal} className='modalGSM__close' style={{width: "50px", height: '50px', marginLeft: "90%", cursor: 'pointer'}} src={close} alt="close" />
              
           
                <img src={ready} alt="raw-towel" />
                   <Typography sx={{textAlign: "center", fontWeight: 600, fontSize: "22px"}}>{count}-шт готовое полотенце={rawResult}гр</Typography>
                  
                   <img src={raw} alt="raw-towel" />
            <Typography sx={{textAlign: "center", fontWeight: 600, fontSize: "22px"}}> {count}-шт сырое полотенце={result}гр</Typography>
            </div>
         
        )
    
    
    }



    return (
      <div className='calculator-wrapper'>
        <ModalGSM></ModalGSM>
        <Box sx={{
            backgroundColor: '#fcfcfc',
            borderRadius: '11px',
            padding: '20px'
        }}>
            <Typography fontWeight={600} color='#11142d' fontSize={25} >Калькулятор для расчета GSM</Typography>
            <Box
                
                 mt='20px'
                 sx={{
                   display: 'flex',
                   flexWrap: 'wrap', 
                   backgroundColor: '#fcfcfc',
                   justifyContent: 'space-between',
                   flexDirection: 'column',
                   gap: '20px'
                   
                   
                 }}

            >
                {/* count */}
                       <Stack width="100%" >
                    <Typography color='#11142d' fontWeight={500} fontSize={20} paddingBottom="10px">Введите количество полотенце </Typography>
                    <input onChange={e=> setCount(e.target.value)} style={{height: "38px", padding:'10px', fontSize: "18px", fontWeight: '500'}} type="number" placeholder='количество' />

                </Stack>

                {/* width */}
                <Stack width="100%">
                    <Typography color='#11142d' fontWeight={500} fontSize={20} paddingBottom="10px">Введите ширину полотенце (sm)</Typography>
                    <Select onChange={onChange} value={getValueWidth()} options={options}/>
                </Stack>
                     {/* height */}
                <Stack margin='0 auto' width="100%">
                    <Typography color='#11142d' fontWeight={500} fontSize={20} paddingBottom="10px">Введите высоту полотенце (sm)</Typography>
                    <Select onChange={onChange2} value={getValueLength()} options={options2}/>
                </Stack>
                {/* Type of towel */}
                <Stack margin='0 auto' width="100%">
                    <Typography color='#11142d' fontWeight={500} fontSize={20} paddingBottom="10px">Введите тип полотенце</Typography>
                    <Select  onChange={onChange3} value={getValueType()}  options={typeOfTowel}/>
                </Stack>
                 {/* GSM */}
                 <Stack margin='0 auto' width="100%">
                    <Typography color='#11142d' fontWeight={500} fontSize={20} paddingBottom="10px">Введите GSM(граммаж )</Typography>
                    <Select  onChange={onChange4} value={getValueGSM()}  options={typeofGSM}/>
                </Stack>
             
                    
                  
                <CustomButton
            
            title='Посчитать'
            backgroundColor = '#475be8'
            color = '#fcfcfc'
            
            handleClick={()=> showResult()}
            
          
         
          
            
    
            />
            

            </Box>
     
        {/* <Typography>{` ${count} сырое полотенце  ${rawResult < 999 ? rawResult+'гр' : rawResult+'кг'}  `}</Typography> */}
     
         
            

        </Box>



        </div>
     
       
         
    
     

    )
}

export default Calсulator;