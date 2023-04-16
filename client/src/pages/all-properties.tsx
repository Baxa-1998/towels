import {Add, Translate} from '@mui/icons-material'

import { useTable } from '@pankod/refine-core'
import {Box, Typography, Stack, TextField,  Select, MenuItem} from '@pankod/refine-mui'
import { PropertyCard, CustomButton } from 'components'
import { useNavigate } from '@pankod/refine-react-router-v6'
import { useMemo } from 'react'


const AllProperties = () => {
  const navigate = useNavigate()

  const {
    tableQueryResult: {data, isLoading, isError}, 
    current, 
    setCurrent, 
    setPageSize,
    pageCount,
    sorter, setSorter , 
    filters, setFilters
  }= useTable()
  console.log(data);
  
  const allProperties = data?.data ?? []; 

  const currentGSM = sorter.find((item) => item.field === 'price')?.order
  const toggleSort = (field: string) =>{
    setSorter([{field, order: currentGSM === 'asc' ? 'desc' : 'asc'}])
  }
  
  const currentFilterValues = useMemo(()=>{
    const logicalFilters = filters.flatMap((item)=>
    ('field' in item ? item : []));

    return {
    title: logicalFilters.find((item)=> item.field === 'title')?.value || '',
    
    propertyType: logicalFilters.find((item)=> item.
    field === 'propertyType')?.value || '',
    
    location: logicalFilters.find((item)=> item.
    field === 'location')?.value || '',
    }
  }, [filters])


  if(isLoading) return <Typography>Loading...</Typography>
  if(isError) return <Typography>Error...</Typography>


  return (
    <Box>
      <Box mt='20px' sx={{ display: 'flex', flexWrap: 'wrap', gap: 3,}}>
      <Stack direction="column" width='100'>
      <Typography
        fontSize={25}
        fontWeight={700}
        color= '#11142d'
        // if items are not founding
        >{!allProperties.length ? 'По вашему запросу ничего не найдено ' : 'Все полотенце'}</Typography>
           <Box
                            display="flex"
                            gap={2}
                            flexWrap="wrap"
                            paddingBottom='15px'
                            mb={{ xs: "20px", sm: 0 }}
                        >
          <CustomButton
          title={`Сортировать по GSM ${currentGSM === 'asc' ? '↑' : '↓'}`}
          handleClick ={()=> toggleSort('price')} 
          backgroundColor= '#475be8'
          color = '#fcfcfc'
          
          
          />
               <TextField
                                variant="outlined"
                                color="info"
                                placeholder="Искать по названию"
                                value={currentFilterValues.title}
                                onChange={(e) => {
                                    setFilters([
                                        {
                                            field: "title",
                                            operator: "contains",
                                            value: e.currentTarget.value ? e.currentTarget.value : undefined
                                        
                                        },
                                    ]);
                                }}
                            />
          <Select
          variant='outlined'
          color ='info'
          displayEmpty 
          required 
          inputProps={{'arial-label': 'Without label'}}
          defaultValue = '' 
          value={currentFilterValues.propertyType}
          onChange={(e) => {
              setFilters([
                  {
                      field: "propertyType",
                      operator: "eq",
                      value: e.target.value
                  
                  }
              ], 'replace')
            }}
            >
              {/* change value */}
              <MenuItem value="">Все</MenuItem>
              {['Сауна',
               'Салфетка', 'Халат', 'Вафли', 'Пакривал', 'Банний-лицевой'].map((type)=> (
                <MenuItem key={type} value={type.toLowerCase()}>{type}</MenuItem>
              ))}
              {/* <MenuItem value="Pakrival-towel">Pakrival towel</MenuItem> */}
                              {/* <MenuItem value="Sauna-towel">Sauna towel</MenuItem>
                              <MenuItem value="Bath-towel">Bath towel</MenuItem>
                              <MenuItem value="Face-towel">Face towel</MenuItem>
                              <MenuItem value="Napkin Towel">Napkin towel</MenuItem> */}
          
          </Select>

        

        </Box>

      </Stack>
      </Box>
      <Stack 
      direction='row'
      justifyContent='space-between'
      alignItems='center'>
   
        <CustomButton
        title='Новое полотенце'
        
        handleClick ={()=> navigate('/properties/create')}
        backgroundColor = '#475be8'
        color = '#fcfcfc' 
        
        icon ={<Add/>}
        


        />
      </Stack>

      
      <Box mt="20px" sx={{  display: "flex", flexWrap: "wrap", gap: 3}} >

    {allProperties.map((property)=> (
      <PropertyCard
       key={property._id}
       id={property._id}
       title={property.title}
       price={property.price} 
       location={property.location}  
       photo={property.photo}  
   
      />
    ))}

      </Box>

      {allProperties.length > 0 && (
        <Box display='flex' gap={2} mt={3} flexWrap= "wrap">
           <CustomButton 
           title='Previous' 
           handleClick={()=> setCurrent((prev)=> prev-1)}
           backgroundColor='#475be8'
           color = '#fcfcfc'
           disabled={!(current > 1)}
           />
           <Box display={{xs: 'hidden', sm: 'flex'}} alignContent= 'center' gap = '5px'>
          Page {' '}<strong>{current} of {pageCount}</strong>
           </Box>
           <CustomButton
                        title="Next"
                        handleClick={() => setCurrent((prev) => prev + 1)}
                        backgroundColor="#475be8"
                        color="#fcfcfc"
                        disabled={current === pageCount}
                    />
                      <Select
          variant='outlined'
          color ='info'
          displayEmpty 
          required 
          inputProps={{'arial-label': 'Without label'}}
          defaultValue = {10}
          onChange={(e)=> setPageSize(e.target.
          value ? Number(e.target.value): 10)}>
            {[10,20,30,50].map((size)=> (
              <MenuItem key = {size} value={size}>Show {size}</MenuItem>
            ))}
             
          
          </Select>

        </Box>
      )}

    </Box>
    
    
  )
}

export default AllProperties