import { useList } from "@pankod/refine-core"
import {Box, Typography} from '@pankod/refine-mui'

import{AgentCard} from 'components'

const Agent = () => {
  const {data, isLoading, isError} = useList({
    resource: "users"
  })
  const allAgents = data?.data ?? [];
  if(isLoading) return <div>Загрузка...</div>
  if(isError) return <div>Ошибка...</div>
  return (
    // we are creating main wrapper 
    <Box>
      {/* title is creating with tag Typography */}
      <Typography fontSize={25} fontWeight={700} color= '#11142d'>
        Пользователи
      </Typography>
      <Box
      mt='20px'
      sx={{
        display: 'flex',
        flexWrap: 'wrap', 
        gap: '20px',
        backgroundColor: '#fcfcfc'
      }}
      >
        {allAgents.map((agent)=> (
          <AgentCard
          key={agent._id}
          id={agent._id}
          name={agent.name}
          email={agent.email}
          avatar= {agent.avatar}
          noOfProperties= {agent.allProperties.length}
          />
        ))}

      </Box>
    </Box>
    
   
  )
}

export default Agent