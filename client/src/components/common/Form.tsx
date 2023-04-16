import {Box, Typography, FormControl, FormHelperText,TextField, 
  TextareaAutosize,Stack, Select, MenuItem, Button, padding, textTransform } from '@pankod/refine-mui'
import {FormProps} from 'interfaces/common'
import CustomButton  from './CustomButton'

const Form = ({
  type,
  register,
  handleSubmit,
  handleImageChange,
  formLoading,
  onFinishHandler,
  propertyImage,
}: FormProps) => {
  return (
      <Box>
          <Typography fontSize={25} fontWeight={700} color="#11142d">
              {type} полотенце
          </Typography>

          <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
              <form
                  style={{
                      marginTop: "20px",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                  }}
                  onSubmit={handleSubmit(onFinishHandler)}
              >
                  <FormControl>
                      <FormHelperText
                          sx={{
                              fontWeight: 500,
                              margin: "10px 0",
                              fontSize: 16,
                              color: "#11142d",
                          }}
                      >
                        Введите название полотенце
                      </FormHelperText>
                      <TextField
                          fullWidth
                          required
                          id="outlined-basic"
                          color="info"
                          variant="outlined"
                          {...register("title", { required: true })}
                      />
                  </FormControl>
                  <FormControl>
                      <FormHelperText
                          sx={{
                              fontWeight: 500,
                              margin: "10px 0",
                              fontSize: 16,
                              color: "#11142d",
                          }}
                      >
                          Описание
                      </FormHelperText>
                      <TextareaAutosize
                          minRows={5}
                          required
                          placeholder="Введите описание к полотенцу  
                          Пример: Размер, Цвет, Нить и тд...."
                          color="info"
                          style={{
                              width: "100%",
                              background: "transparent",
                              fontSize: "16px",
                              borderColor: "rgba(0,0,0,0.23)",
                              borderRadius: 6,
                              padding: 10,
                              color: "#919191",
                          }}
                          {...register("description", { required: true })}
                      />
                  </FormControl>

                  <Stack direction="row" gap={4}>
                      <FormControl sx={{ flex: 1 }}>
                          <FormHelperText
                              sx={{
                                  fontWeight: 500,
                                  margin: "10px 0",
                                  fontSize: 16,
                                  color: "#11142d",
                              }}
                          >
                              Введите тип полотенце 
                          </FormHelperText>
                          <Select
                              variant="outlined"
                              color="info"
                              displayEmpty
                              required
                              inputProps={{ "aria-label": "Without label" }}
                              defaultValue="apartment"
                              {...register("propertyType", {
                                  required: true,
                              })}
                          >
                            {/* change value */}
                              <MenuItem value="пакривал">Пакривал</MenuItem>
                              <MenuItem value="сауна">Сауна</MenuItem>
                              <MenuItem value="банний-лицевой">Банний-Лицевой</MenuItem>         
                              <MenuItem value="салфетка">Салфетка</MenuItem>
                              <MenuItem value="халат">Халат</MenuItem>
                              <MenuItem value="вафли">Вафли</MenuItem>
                            
                              {/* <MenuItem value="studio">Studio</MenuItem>
                              <MenuItem value="chalet">Chalet</MenuItem> */}
                          </Select>
                      </FormControl>
                      <FormControl>
                          <FormHelperText
                              sx={{
                                  fontWeight: 500,
                                  margin: "10px 0",
                                  fontSize: 16,
                                  color: "#11142d",
                              }}
                          >
                            {/* change input price */}
                            Введите GSM
                          </FormHelperText>
                          <Select
                              fullWidth
                              required
                              id="outlined-basic"
                              color="info"
                              type="number"
                              variant="outlined"
                              {...register("price", { required: true })}>
                                <MenuItem value="400">400</MenuItem>
                                <MenuItem value="450">450</MenuItem>
                                <MenuItem value="500">500</MenuItem>
                                <MenuItem value="550">550</MenuItem>
                                <MenuItem value="600">600</MenuItem>
                                <MenuItem value="650">650</MenuItem>

                              </Select>
                      </FormControl>
                  
                  </Stack>

                  <FormControl>
                      <FormHelperText
                          sx={{
                              fontWeight: 500,
                              margin: "10px 0",
                              fontSize: 16,
                              color: "#11142d",
                          }}
                      >

                          Введите станок полотенце
                      </FormHelperText>
                      <Select
                          fullWidth
                          required
                          id="outlined-basic"
                          color="info"
                          variant="outlined"
                          inputProps={{ "aria-label": "Without label" }}
                          defaultValue="type of towel"
                          {...register("location", { required: true })}>
                      
                          <MenuItem value="Джакарт">Джакарт</MenuItem>
                          <MenuItem value="Добби">Добби</MenuItem>
                          </Select>

                          
                       

                  </FormControl>

                  <Stack
                      direction="column"
                      gap={1}
                      justifyContent="center"
                      mb={2}
                  >
                      <Stack direction="row" gap={2}>
                          <Typography
                              color="#11142d"
                              fontSize={16}
                              fontWeight={500}
                              my="10px"
                          >
                              Property Photo
                          </Typography>

                          <Button
                              component="label"
                              sx={{
                                  width: "fit-content",
                                  color: "#2ed480",
                                  textTransform: "capitalize",
                                  fontSize: 16,
                              }}
                          >
                              Upload *
                              <input
                                  hidden
                                  accept="image/*"
                                  type="file"
                                  onChange={(
                                      e: React.ChangeEvent<HTMLInputElement>,
                                  ) => {
                                      handleImageChange(e.target.files![0]);
                                  }}
                              />
                          </Button>
                      </Stack>
                      <Typography
                          fontSize={14}
                          color="#808191"
                          sx={{ wordBreak: "break-all" }}
                      >
                          {propertyImage?.name}
                      </Typography>
                  </Stack>

                  <CustomButton
                      type="submit"
                      title={formLoading ? "Submitting..." : "Submit"}
                      backgroundColor="#475be8"
                      color="#fcfcfc"
                  />
              </form>
          </Box>
      </Box>
  );
};

export default Form