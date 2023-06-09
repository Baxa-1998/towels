
import { Typography, Box, Stack } from "@mui/material";
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    ChatBubble,
    Delete,
    Edit,
    Phone,
    Place,
    Star,
} from "@mui/icons-material";

import { CustomButton } from "components";
import { OrderModal } from "./order-modal";




function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}





const PropertyDetails = () => {
    const navigate = useNavigate();
    const { data: user } = useGetIdentity({});
    const { queryResult } = useShow();
    const { mutate } = useDelete();
    const { id } = useParams();
    const [order, setOrder] = useState(false)

  


    const { data, isLoading, isError } = queryResult;

    const propertyDetails = data?.data ?? {};

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (isError) {
        return <div>Что-то пошло не так!</div>;
    }

    const isCurrentUser = user.email === propertyDetails.creator.email;

    const handleDeleteProperty = () => {
        const response = window.confirm("Вы действительно хотите удалить это полотенце ?",);
        if (response) {
            mutate({
                    resource: "properties",
                    id: id as string,
                });
                    
               navigate("/properties");
                    
            }
            
        
    };
    function openOrderModal () {
        setOrder(prev=>{
            return !prev
        })
        
    }


    return (
        <>
      <OrderModal openOrderModal={openOrderModal} order={order}/>
        <Box
            borderRadius="15px"
            padding="20px"
            bgcolor="#FCFCFC"
            width="90%"
            

        >
         
         
            <Typography  fontSize={25} fontWeight={700} color="#11142D">
               Информация о полотенце 
            </Typography>

            <Box
                width='100%'
                mt="20px"
                display="flex"
                flexDirection={{ xs: "column", lg: "row" }}
                gap={4}
                justifyContent='space-around'
            >
                <Box flex={1} maxWidth={764}>
                    <img
                        src={propertyDetails.photo}
                        alt="property_details-img"
                        height={546}
                        style={{ objectFit: "cover", borderRadius: "10px" }}
                        className="property_details-img"
                    />

                    <Box mt="15px">
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            flexWrap="wrap"
                            alignItems="center"

                        >
                            <Typography
                                fontSize={18}
                                fontWeight={500}
                                color="#11142D"
                                textTransform="capitalize"
                            >
                                {propertyDetails.propertyType}
                            </Typography>
                            <Box>
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <Star
                                        key={`star-${item}`}
                                        sx={{ color: "#F2C94C" }}
                                    />
                                ))}
                            </Box>
                        </Stack>

                        <Stack
                            direction="row"
                            flexWrap="wrap"
                            justifyContent="space-between"
                            alignItems="center"
                            gap={2}
                        >
                            <Box>
                                <Typography
                                    fontSize={22}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#11142D"
                                >
                                    {propertyDetails.title}
                                </Typography>
                                <Stack
                                    mt={0.5}
                                    direction="row"
                                    alignItems="center"
                                    gap={0.5}
                                >
                                    <Place sx={{ color: "#808191" }} />
                                    <Typography fontSize={14} color="#808191">
                                        {propertyDetails.location}
                                    </Typography>
                                </Stack>
                            </Box>

                            <Box>
                                <Typography
                                    fontSize={16}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#11142D"
                                >
                                    GSM
                                </Typography>
                                <Stack
                                    direction="row"
                                    alignItems="flex-end"
                                    gap={1}
                                >
                                    <Typography
                                        fontSize={25}
                                        fontWeight={700}
                                        color="#475BE8"
                                    >

                                     {propertyDetails.price}
                                    </Typography>
                                    <Typography
                                        fontSize={14}
                                        color="#808191"
                                        mb={0.5}
                                    >
                                        Одно полотенце 
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>

                        <Stack mt="25px" direction="column" gap="10px">
                            <Typography fontSize={18} color="#11142D">
                                Description
                            </Typography>
                            <Typography fontSize={14} color="#808191">
                                {propertyDetails.description}
                            </Typography>
                        </Stack>
                    </Box>
                </Box>

                <Box
                    width="100%"
                    flex={1}
                    maxWidth={326}
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                >
                    <Stack
                        width="100%"
                        p={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid #E4E4E4"
                        borderRadius={2}
                    >
                        <Stack
                            mt={2}
                            justifyContent="center"
                            alignItems="center"
                            textAlign="center"
                        >
                            <img
                                src={
                                    checkImage(propertyDetails.creator.avatar)
                                        ? propertyDetails.creator.avatar
                                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                }
                                alt="avatar"
                                width={90}
                                height={90}
                                style={{
                                    borderRadius: "100%",
                                    objectFit: "cover",
                                }}
                            />

                            <Box mt="15px">
                                <Typography
                                    fontSize={18}
                                    fontWeight={600}
                                    color="#11142D"
                                >
                                    {propertyDetails.creator.name}
                                </Typography>
                                <Typography
                                    mt="5px"
                                    fontSize={14}
                                    fontWeight={400}
                                    color="#808191"
                                >
                                    User
                                </Typography>
                            </Box>

                            <Stack
                                mt="15px"
                                direction="row"
                                alignItems="center"
                                gap={1}
                            >
                                <Place sx={{ color: "#808191" }} />
                                <Typography
                                    fontSize={14}
                                    fontWeight={400}
                                    color="#808191"
                                >
                                    Uzbekistan, Samarkand
                                </Typography>
                            </Stack>

                            <Typography
                                mt={1}
                                fontSize={16}
                                fontWeight={600}
                                color="#11142D"
                            >
                                {propertyDetails.creator.allProperties.length}{" "}
                                Properties
                            </Typography>
                        </Stack>

                        <Stack
                            width="100%"
                            mt="25px"
                            direction="row"
                            flexWrap="wrap"
                            gap={2}
                        >
                            <CustomButton
                                title={!isCurrentUser ? "Message" : "Edit"}
                                backgroundColor="#475BE8"
                                color="#FCFCFC"
                                fullWidth
                                icon={
                                    !isCurrentUser ? <ChatBubble /> : <Edit />
                                }
                                handleClick={() => {
                                    if (isCurrentUser) {
                                        navigate(
                                            `/properties/edit/${propertyDetails._id}`,
                                        );
                                    }
                                }}
                            />
                            <CustomButton
                                title={!isCurrentUser ? "Call" : "Delete"}
                                backgroundColor={
                                    !isCurrentUser ? "#2ED480" : "#d42e2e"
                                }
                                color="#FCFCFC"
                                fullWidth
                                icon={!isCurrentUser ? <Phone /> : <Delete />}
                                handleClick={() => {
                                    if (isCurrentUser) handleDeleteProperty();
                                }}
                            />
                        </Stack>
                    </Stack>

                    <Stack>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6141.20350212306!2d67.046908293414!3d39.681172221676135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4d23ca5d330767%3A0x4ff24d0bc159d338!2sParisa%20Home!5e0!3m2!1sru!2s!4v1680366847493!5m2!1sru!2s" width="100%" height="320px" ></iframe>

                       
                    </Stack>

                    <Box>
                        <CustomButton
                            title="Заказать сейчас"
                            backgroundColor="#475BE8"
                            color="#FCFCFC"
                            fullWidth
                            handleClick={()=> openOrderModal()}

                            
                        
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
        </>
    );
};

export default PropertyDetails;