import Header from "../components/Header/Header";
import Heading from "../components/Heading";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { LuUpload } from "react-icons/lu";
import axios from "axios";
import { useRef, useState } from "react";
import { FaDownload, FaArrowRightLong, FaChevronLeft, FaAngleRight } from "react-icons/fa6";

const Editor = () => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null); // URL for the input image
  const [sketchedImage, setSketchedImage] = useState(null);
  const [open, setOpen] = useState(true);

  const downloadLinkRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImageURL(URL.createObjectURL(file)); // Create URL for input image display
  };

  const handleSubmit = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob", // Ensures the response is handled as a binary file
      });

      const sketchedImageURL = URL.createObjectURL(response.data);
      setSketchedImage(sketchedImageURL);
    } catch (error) {
      console.error("There was an error processing your image!", error);
    }
  };

  const handleDownload = () => {
    if (sketchedImage) {
      downloadLinkRef.current.href = sketchedImage;
      downloadLinkRef.current.download = "sketched-image.png";
      downloadLinkRef.current.click();
    }
  };

  return (
    <div className='bg-[#292c31]'>
      <Heading title='PIXTIT' description='' keywords='' icon='../../public/favicon.ico' />
      <Header />

      <div className='pt-[69px] overflow-hidden max-h-screen'>
        <Tab.Container id='left-tabs' defaultActiveKey='first'>
          <Row>
            <Col
              sm={1}
              className='overflow-scroll small-scrollbar pr-[2px] border-r-[1px] border-t-[1px] border-[#080808] z-10 '
              style={{
                height: "calc(100vh - 54px)",
              }}
            >
              <Nav variant='pills' className='flex-column'>
                <Nav.Item>
                  <Nav.Link eventKey='first' className='flex flex-col items-center justify-center !text-white m-[4px]'>
                    <LuUpload className='text-[20px]' />
                    <p>Effects</p>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='second' className='flex flex-col items-center justify-center !text-white m-[4px]'>
                    <LuUpload className='text-[20px]' />
                    <p>Style </p>
                    <p>Transfer</p>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col
              sm={3}
              className={`overflow-scroll small-scrollbar p-[10px] border-t-[1px] border-[#080808] z-10 ${
                !open && "w-[0px] !p-[0px] "
              }`}
              style={{
                height: "calc(100vh - 54px)",
              }}
            >
              <Tab.Content>
                <Tab.Pane eventKey='first'>
                  <h3 className='font-semibold text-[20px] mb-[6px]'>Effects</h3>

                  <Tab.Container id='effect-tabs' defaultActiveKey='effect-first'>
                    <Row>
                      <Col sm={4} className=''>
                        <Nav variant='pills' className='flex-column'>
                          <Nav.Item>
                            <Nav.Link
                              eventKey='effect-first'
                              className='flex flex-col items-center justify-center !text-white'
                            >
                              <p>Simple</p>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey='effect-second'
                              className='flex flex-col items-center justify-center !text-white'
                            >
                              <p>Sketch</p>
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Col>
                      <Col sm={8} className=''>
                        <Tab.Content>
                          <Tab.Pane eventKey='effect-first'>
                            <div className='flex gap-[6px] flex-wrap'>
                              <div
                                onClick={handleSubmit}
                                className='flex flex-col justify-center items-center w-fit cursor-pointer'
                              >
                                <img
                                  src='https://img6.arthub.ai/64b14631-7235.webp'
                                  alt=''
                                  className='h-[100px] w-[100px] object-cover'
                                />
                                <span>Sketch</span>
                              </div>
                              <div
                                onClick={handleSubmit}
                                className='flex flex-col justify-center items-center w-fit cursor-pointer'
                              >
                                <img
                                  src='https://img6.arthub.ai/64b14631-7235.webp'
                                  alt=''
                                  className='h-[100px] w-[100px] object-cover'
                                />
                                <span>Sketch</span>
                              </div>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey='effect-second'></Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </Tab.Pane>
                <Tab.Pane eventKey='second'></Tab.Pane>
              </Tab.Content>
            </Col>
            <Col
              sm={open ? 8 : 11}
              className='pr-[2px] border-t-[1px] border-[#080808] bg-[#1d1d1d]'
              style={{
                height: "calc(100vh - 69px)",
              }}
            >
              <div
                className='relative flex items-center justify-center flex-row gap-[20px]'
                style={{
                  height: "calc(100vh - 69px - 50px)",
                }}
              >
                {!imageURL && (
                  <div>
                    <input type='file' id='image' className='hidden' onChange={handleImageUpload} />

                    <label htmlFor='image' className='flex flex-col items-center justify-center'>
                      <svg width='80' height='80' viewBox='0 0 130 130' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M118.42 75.84C118.43 83.2392 116.894 90.5589 113.91 97.33H16.09C12.8944 90.0546 11.3622 82.1579 11.6049 74.2154C11.8477 66.2728 13.8593 58.4844 17.4932 51.4177C21.1271 44.3511 26.2918 38.1841 32.6109 33.3662C38.93 28.5483 46.2443 25.2008 54.0209 23.5676C61.7976 21.9345 69.8406 22.0568 77.564 23.9257C85.2873 25.7946 92.4965 29.363 98.6661 34.3709C104.836 39.3787 109.81 45.6999 113.228 52.8739C116.645 60.0478 118.419 67.8937 118.42 75.84Z'
                          fill='#F2F2F2'
                        ></path>
                        <path
                          d='M5.54 97.33H126.37'
                          stroke='#63666A'
                          strokeWidth='1'
                          strokeMiterlimit='10'
                          strokeLinecap='round'
                        ></path>
                        <path
                          d='M97 97.33H49.91V34.65C49.91 34.3848 50.0154 34.1305 50.2029 33.9429C50.3904 33.7554 50.6448 33.65 50.91 33.65H84.18C84.6167 33.6541 85.0483 33.7445 85.4499 33.9162C85.8515 34.0878 86.2152 34.3372 86.52 34.65L96.02 44.15C96.3321 44.4533 96.5811 44.8153 96.7527 45.2151C96.9243 45.615 97.0152 46.0449 97.02 46.48L97 97.33Z'
                          fill='#D7D7D7'
                          stroke='#63666A'
                          strokeWidth='1'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        ></path>
                        <path
                          d='M59.09 105.64H42.09C41.8248 105.64 41.5704 105.535 41.3829 105.347C41.1954 105.16 41.09 104.905 41.09 104.64V41.79C41.09 41.5248 41.1954 41.2705 41.3829 41.0829C41.5704 40.8954 41.8248 40.79 42.09 40.79H77.33L89 52.42V104.62C89 104.885 88.8946 105.14 88.7071 105.327C88.5196 105.515 88.2652 105.62 88 105.62H74.86'
                          fill='white'
                        ></path>
                        <path
                          d='M59.09 105.64H42.09C41.8248 105.64 41.5704 105.535 41.3829 105.347C41.1954 105.16 41.09 104.905 41.09 104.64V41.79C41.09 41.5248 41.1954 41.2705 41.3829 41.0829C41.5704 40.8954 41.8248 40.79 42.09 40.79H77.33L89 52.42V104.62C89 104.885 88.8946 105.14 88.7071 105.327C88.5196 105.515 88.2652 105.62 88 105.62H74.86'
                          stroke='#63666A'
                          strokeWidth='1'
                          strokeMiterlimit='10'
                          strokeLinecap='round'
                        ></path>
                        <path
                          d='M88.97 52.42H77.33V40.77L88.97 52.42Z'
                          fill='#D7D7D7'
                          stroke='#63666A'
                          strokeWidth='1'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        ></path>
                        <path
                          d='M27.32 65.49V70.6'
                          stroke='#D7D7D7'
                          strokeWidth='1'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        ></path>
                        <path
                          d='M29.88 68.04H24.76'
                          stroke='#D7D7D7'
                          strokeWidth='1'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        ></path>
                        <path
                          d='M110.49 32.5601V39.9901'
                          stroke='#D7D7D7'
                          strokeWidth='1'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        ></path>
                        <path
                          d='M114.2 36.27H106.77'
                          stroke='#D7D7D7'
                          strokeWidth='1'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        ></path>
                        <path
                          d='M34.07 14.58V25.59'
                          stroke='#D7D7D7'
                          strokeWidth='1'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        ></path>
                        <path
                          d='M39.57 20.08H28.57'
                          stroke='#D7D7D7'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        ></path>
                        <path
                          d='M67 115.86V67.12'
                          stroke='#63666A'
                          strokeWidth='1'
                          strokeMiterlimit='10'
                          strokeLinecap='round'
                        ></path>
                        <path d='M55.5 78.61L67 67.12L78.5 78.61' fill='white'></path>
                        <path
                          d='M55.5 78.61L67 67.12L78.5 78.61'
                          stroke='#63666A'
                          strokeWidth='1'
                          strokeMiterlimit='10'
                        ></path>
                      </svg>
                      <p>Bấm để chọn ảnh cần tải lên</p>
                    </label>
                  </div>
                )}

                {imageURL && (
                  <div>
                    <img src={imageURL} alt='Original' style={{ maxWidth: "300px", maxHeight: "300px" }} />
                  </div>
                )}

                {sketchedImage && (
                  <>
                    <FaArrowRightLong className='px-[10px] text-[50px] text-[#fff]' />
                    <div>
                      <img src={sketchedImage} alt='Pencil Sketch' style={{ maxWidth: "300px", maxHeight: "300px" }} />
                    </div>
                  </>
                )}

                <div className='absolute top-[100%] left-[-12px] right-0 w-[100%] h-[50px] bg-[#292c31] flex items-center justify-end px-[15px]'>
                  <button
                    onClick={handleDownload}
                    className='flex items-center justify-center py-[4px] px-[15px] rounded-[5px] gap-[4px] bg-[#00a3da] text-white'
                  >
                    <FaDownload />
                    Lưu ảnh
                  </button>
                  <a ref={downloadLinkRef} style={{ display: "none" }}></a> {/* Hidden link for download */}
                </div>
              </div>
            </Col>
          </Row>
        </Tab.Container>

        <div
          className={`absolute top-[50%]  w-[50px] h-[50px] bg-[#292c31] rounded-[10px] flex items-center p-[4px] cursor-pointer justify-end z-1 ${
            open ? "left-[423px]" : "left-[75px]"
          }`}
          onClick={() => setOpen(!open)}
        >
          {open ? <FaChevronLeft /> : <FaAngleRight />}
        </div>
      </div>
    </div>
  );
};

export default Editor;
