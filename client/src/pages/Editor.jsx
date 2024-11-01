import Header from "../components/Header/Header";
import Heading from "../components/Heading";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import axios from "axios";
import { useRef, useState } from "react";
import { FaDownload, FaArrowRightLong, FaChevronLeft, FaAngleRight, FaPlus, FaEquals } from "react-icons/fa6";

const Editor = () => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [styledImage, setStyledImage] = useState(null);
  const [open, setOpen] = useState(true);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImageURL(URL.createObjectURL(file));
  };

  // EFFECTS
  const handleApplyEffect = async (type) => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post(`http://127.0.0.1:5000/${type}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });

      const newImageURL = URL.createObjectURL(response.data);
      setStyledImage(newImageURL);
    } catch (error) {
      console.error("There was an error processing your image!", error);
    }
  };

  // STYLE TRANSFER
  const handleStyleTransfer = async (checkpointPath, specificCheckpointPath) => {
    try {
      if (!image) return;

      // Tạo một FormData để chứa file và các tham số cần thiết
      const formData = new FormData();
      formData.append("image", image); // file ảnh cần chuyển đổi
      formData.append("checkpoint_path", checkpointPath); // đường dẫn tới checkpoint
      formData.append("specific_checkpoint_path", specificCheckpointPath); // đường dẫn cụ thể của checkpoint

      // Gửi yêu cầu tới API
      const response = await axios.post("http://127.0.0.1:5000/styleTransfer", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });

      // Tạo URL từ blob để hiển thị ảnh đã chuyển đổi
      const newImageURL = URL.createObjectURL(new Blob([response.data]));
      setStyledImage(newImageURL);
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu tới API:", error);
      return null;
    }
  };

  // COLORIZATION
  const handleColorization = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post("http://localhost:5000/colorize", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });

      const newImageURL = URL.createObjectURL(response.data);
      setStyledImage(newImageURL);
    } catch (error) {
      console.error("There was an error processing your image!", error);
    }
  };

  // COLOR TRANSFER
  const [startColorTransfer, setStartColorTransfer] = useState(false);
  const [sourceImage, setSourceImage] = useState(null);
  const [sourceImageURL, setSourceImageURL] = useState(null);
  const [referenceImage, setReferenceImage] = useState(null);
  const [referenceImageURL, setReferenceImageURL] = useState(null);
  const [resultImage, setResultImage] = useState(null);

  const handleSourceChange = (event) => {
    const file = event.target.files[0];
    setSourceImage(file);
    setSourceImageURL(URL.createObjectURL(file));
  };

  const handleReferenceChange = (event) => {
    const file = event.target.files[0];
    setReferenceImage(file);
    setReferenceImageURL(URL.createObjectURL(file));
  };

  const handleColorTransfer = async (event) => {
    event.preventDefault();
    setResultImage(null);

    if (!sourceImage || !referenceImage) {
      return;
    }

    const formData = new FormData();
    formData.append("source_image", sourceImage);
    formData.append("reference_image", referenceImage);

    try {
      const response = await axios.post("http://127.0.0.1:5000/colorTransfer", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      });

      const imageUrl = URL.createObjectURL(response.data);
      setResultImage(imageUrl);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleColorTransferWithSample = async (referenceImage) => {
    if (!image) {
      return;
    }

    const formData = new FormData();
    formData.append("source_image", image);
    formData.append("reference_image", referenceImage);

    try {
      const response = await axios.post("http://127.0.0.1:5000/colorTransferWithSample", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      });

      const newImageURL = URL.createObjectURL(new Blob([response.data]));
      setStyledImage(newImageURL);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // HANDLE DOWNLOAD IMAGE
  const downloadLinkRef = useRef(null);

  const handleDownload = () => {
    if (styledImage || resultImage) {
      const timestamp = new Date().toISOString().replace(/[-:.]/g, "").slice(0, 15);
      const filename = `image_${timestamp}.png`;

      downloadLinkRef.current.href = styledImage || resultImage;
      downloadLinkRef.current.download = filename;
      downloadLinkRef.current.click();
    }
  };

  const reset = () => {
    setImage(null);
    setImageURL(null);
    setStyledImage(null);
    setSourceImage(null);
    setSourceImageURL(null);
    setReferenceImage(null);
    setReferenceImageURL(null);
    setResultImage(null);
  };

  return (
    <div className='bg-[#292c31]'>
      <Heading title='PIXTIT' description='' keywords='' icon='../../public/favicon.ico' />
      <Header />

      <div className='pt-[69px] overflow-hidden max-h-screen'>
        <Tab.Container id='left-tabs' defaultActiveKey='effects'>
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
                  <Nav.Link
                    eventKey='effects'
                    className='flex flex-col items-center justify-center !text-white m-[4px]'
                  >
                    <p className='line-clamp-1 text-center'>Effects</p>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey='colorization'
                    className='flex flex-col items-center justify-center !text-white m-[4px] px-[4px]'
                  >
                    <p className='line-clamp-1 text-center'>Colorize</p>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey='style-transfer'
                    className='flex flex-col items-center justify-center !text-white m-[4px] px-[4px]'
                  >
                    <p className='line-clamp-1 text-center leading-4'>Style</p>
                    <p className='line-clamp-1 text-center leading-4'>Transfer</p>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey='colorTransfer'
                    className='flex flex-col items-center justify-center !text-white m-[4px] px-[4px]'
                  >
                    <p className='line-clamp-1 text-center leading-4'>Color</p>
                    <p className='line-clamp-1 text-center leading-4'>Transfer</p>
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
                <Tab.Pane eventKey='effects'>
                  <h1 className='font-semibold text-[20px] mb-[10px] uppercase'>Effects</h1>

                  <Tab.Container id='effect-tabs' defaultActiveKey='simple'>
                    <Row>
                      <Col sm={4} className=''>
                        <Nav variant='pills' className='flex-column'>
                          <Nav.Item>
                            <Nav.Link
                              eventKey='simple'
                              className='flex flex-col items-center justify-center !text-white p-[6px] !rounded-[14px] mb-[2px]'
                            >
                              <p className='text-[14px]'>Simple</p>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey='FX'
                              className='flex flex-col items-center justify-center !text-white p-[6px] !rounded-[14px] mb-[2px]'
                            >
                              <p className='text-[14px]'>FX</p>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey='B&W'
                              className='flex flex-col items-center justify-center !text-white p-[6px] !rounded-[14px] mb-[2px]'
                            >
                              <p className='text-[14px]'>B&W</p>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey='blur'
                              className='flex flex-col items-center justify-center !text-white p-[6px] !rounded-[14px] mb-[2px]'
                            >
                              <p className='text-[14px]'>Blur</p>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey='colors'
                              className='flex flex-col items-center justify-center !text-white p-[6px] !rounded-[14px] mb-[2px]'
                            >
                              <p className='text-[14px]'>Colors</p>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey='light-filters'
                              className='flex flex-col items-center justify-center !text-white p-[6px] !rounded-[14px] mb-[2px]'
                            >
                              <p className='text-[14px]'>Light Filters</p>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey='artistic'
                              className='flex flex-col items-center justify-center !text-white p-[6px] !rounded-[14px] mb-[2px]'
                            >
                              <p className='text-[14px]'>Artistic</p>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey='color-toning'
                              className='flex flex-col items-center justify-center !text-white p-[6px] !rounded-[14px] mb-[2px]'
                            >
                              <p className='text-[14px]'>Color Toning</p>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey='cartoon'
                              className='flex flex-col items-center justify-center !text-white p-[6px] !rounded-[14px] mb-[2px]'
                            >
                              <p className='text-[14px]'>Cartoon</p>
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Col>
                      <Col sm={8} className=''>
                        <Tab.Content>
                          <Tab.Pane eventKey='simple'></Tab.Pane>
                          <Tab.Pane eventKey='FX'></Tab.Pane>
                          <Tab.Pane eventKey='B&W'></Tab.Pane>
                          <Tab.Pane eventKey='blur'>
                            <div className='flex gap-[6px] flex-wrap'>
                              <div
                                onClick={() => handleApplyEffect("blur")}
                                className='relative flex flex-col justify-center items-center w-fit cursor-pointer'
                              >
                                <img
                                  src='../../public/blur/blur.png'
                                  alt=''
                                  className='h-[100px] w-[100px] object-cover'
                                />
                                <span className='absolute bottom-[4px] right-[35%] bg-[#d8d8d8] text-[#2d2d2d] text-[12px] font-medium rounded-[15px] px-[6px]'>
                                  Blur
                                </span>
                              </div>
                              <div
                                onClick={() => handleApplyEffect("pixelize")}
                                className='relative flex flex-col justify-center items-center w-fit cursor-pointer'
                              >
                                <img
                                  src='../../public/blur/pixelize.png'
                                  alt=''
                                  className='h-[100px] w-[100px] object-cover'
                                />
                                <span className='absolute bottom-[4px] right-[25%] bg-[#d8d8d8] text-[#2d2d2d] text-[12px] font-medium rounded-[15px] px-[6px]'>
                                  Pixelize
                                </span>
                              </div>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey='colors'></Tab.Pane>
                          <Tab.Pane eventKey='light-filters'></Tab.Pane>
                          <Tab.Pane eventKey='artistic'>
                            <div className='flex gap-[6px] flex-wrap'>
                              <div
                                onClick={() => handleApplyEffect("fattal")}
                                className='relative flex flex-col justify-center items-center w-fit cursor-pointer'
                              >
                                <img
                                  src='../../public/artisticAndCartoon/fattal_result.png'
                                  alt=''
                                  className='h-[100px] w-[100px] object-cover'
                                />
                                <span className='absolute bottom-[4px] right-[25%] bg-[#d8d8d8] text-[#2d2d2d] text-[12px] font-medium rounded-[15px] px-[6px]'>
                                  Fattal
                                </span>
                              </div>
                              <div
                                onClick={() => handleApplyEffect("emboss")}
                                className='relative flex flex-col justify-center items-center w-fit cursor-pointer'
                              >
                                <img
                                  src='../../public/artisticAndCartoon/emboss_result.png'
                                  alt=''
                                  className='h-[100px] w-[100px] object-cover'
                                />
                                <span className='absolute bottom-[4px] right-[25%] bg-[#d8d8d8] text-[#2d2d2d] text-[12px] font-medium rounded-[15px] px-[6px]'>
                                  Emboss
                                </span>
                              </div>
                              <div
                                onClick={() => handleApplyEffect("comic")}
                                className='relative flex flex-col justify-center items-center w-fit cursor-pointer'
                              >
                                <img
                                  src='../../public/artisticAndCartoon/comic_result.png'
                                  alt=''
                                  className='h-[100px] w-[100px] object-cover'
                                />
                                <span className='absolute bottom-[4px] right-[25%] bg-[#d8d8d8] text-[#2d2d2d] text-[12px] font-medium rounded-[15px] px-[6px]'>
                                  Comic
                                </span>
                              </div>
                              <div
                                onClick={() => handleApplyEffect("mirror")}
                                className='relative flex flex-col justify-center items-center w-fit cursor-pointer'
                              >
                                <img
                                  src='../../public/artisticAndCartoon/mirror_result.png'
                                  alt=''
                                  className='h-[100px] w-[100px] object-cover'
                                />
                                <span className='absolute bottom-[4px] right-[25%] bg-[#d8d8d8] text-[#2d2d2d] text-[12px] font-medium rounded-[15px] px-[6px]'>
                                  Mirror
                                </span>
                              </div>
                              <div
                                onClick={() => handleApplyEffect("pastel")}
                                className='relative flex flex-col justify-center items-center w-fit cursor-pointer'
                              >
                                <img
                                  src='../../public/artisticAndCartoon/pastel.png'
                                  alt=''
                                  className='h-[100px] w-[100px] object-cover'
                                />
                                <span className='absolute bottom-[4px] right-[25%] bg-[#d8d8d8] text-[#2d2d2d] text-[12px] font-medium rounded-[15px] px-[6px]'>
                                  Pastel
                                </span>
                              </div>
                              <div
                                onClick={() => handleApplyEffect("polygon1")}
                                className='relative flex flex-col justify-center items-center w-fit cursor-pointer'
                              >
                                <img
                                  src='../../public/artisticAndCartoon/polygon_result.png'
                                  alt=''
                                  className='h-[100px] w-[100px] object-cover'
                                />
                                <span className='absolute bottom-[4px] right-[15%] bg-[#d8d8d8] text-[#2d2d2d] text-[12px] font-medium rounded-[15px] px-[6px]'>
                                  Polygon 1
                                </span>
                              </div>
                              <div
                                onClick={() => handleApplyEffect("polygon2")}
                                className='relative flex flex-col justify-center items-center w-fit cursor-pointer'
                              >
                                <img
                                  src='../../public/artisticAndCartoon/polygon2_result.png'
                                  alt=''
                                  className='h-[100px] w-[100px] object-cover'
                                />
                                <span className='absolute bottom-[4px] right-[15%] bg-[#d8d8d8] text-[#2d2d2d] text-[12px] font-medium rounded-[15px] px-[6px]'>
                                  Polygon 2
                                </span>
                              </div>
                              <div
                                onClick={() => handleApplyEffect("watercolor")}
                                className='relative flex flex-col justify-center items-center w-fit cursor-pointer'
                              >
                                <img
                                  src='../../public/artisticAndCartoon/watercolor_result.png'
                                  alt=''
                                  className='h-[100px] w-[100px] object-cover'
                                />
                                <span className='absolute bottom-[4px] right-[15%] bg-[#d8d8d8] text-[#2d2d2d] text-[12px] font-medium rounded-[15px] px-[6px]'>
                                  Watercolor
                                </span>
                              </div>
                              <div
                                onClick={() => handleApplyEffect("sketcher1")}
                                className='relative flex flex-col justify-center items-center w-fit cursor-pointer'
                              >
                                <img
                                  src='../../public/artisticAndCartoon/sketcher1_result.png'
                                  alt=''
                                  className='h-[100px] w-[100px] object-cover'
                                />
                                <span className='absolute bottom-[4px] right-[15%] bg-[#d8d8d8] text-[#2d2d2d] text-[12px] font-medium rounded-[15px] px-[6px]'>
                                  Sketcher 1
                                </span>
                              </div>
                              <div
                                onClick={() => handleApplyEffect("sketcher2")}
                                className='relative flex flex-col justify-center items-center w-fit cursor-pointer'
                              >
                                <img
                                  src='../../public/artisticAndCartoon/sketcher2_result.png'
                                  alt=''
                                  className='h-[100px] w-[100px] object-cover'
                                />
                                <span className='absolute bottom-[4px] right-[15%] bg-[#d8d8d8] text-[#2d2d2d] text-[12px] font-medium rounded-[15px] px-[6px]'>
                                  Sketcher 2
                                </span>
                              </div>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey='color-toning'></Tab.Pane>
                          <Tab.Pane eventKey='cartoon'>
                            <div className='flex gap-[6px] flex-wrap'>
                              <div
                                onClick={() => handleApplyEffect("cartoonize1")}
                                className='relative flex flex-col justify-center items-center w-fit cursor-pointer'
                              >
                                <img
                                  src='../../public/artisticAndCartoon/cartoon1_result.png'
                                  alt=''
                                  className='h-[100px] w-[100px] object-cover'
                                />
                                <span className='absolute bottom-[4px] right-[15%] bg-[#d8d8d8] text-[#2d2d2d] text-[12px] font-medium rounded-[15px] px-[6px]'>
                                  Cartoon 1
                                </span>
                              </div>
                              <div
                                onClick={() => handleApplyEffect("cartoonize2")}
                                className='relative flex flex-col justify-center items-center w-fit cursor-pointer'
                              >
                                <img
                                  src='../../public/artisticAndCartoon/cartoon2_result.png'
                                  alt=''
                                  className='h-[100px] w-[100px] object-cover'
                                />
                                <span className='absolute bottom-[4px] right-[15%] bg-[#d8d8d8] text-[#2d2d2d] text-[12px] font-medium rounded-[15px] px-[6px]'>
                                  Cartoon 2
                                </span>
                              </div>
                              <div
                                onClick={() => handleApplyEffect("cartoonize3")}
                                className='relative flex flex-col justify-center items-center w-fit cursor-pointer'
                              >
                                <img
                                  src='../../public/artisticAndCartoon/cartoon3_result.png'
                                  alt=''
                                  className='h-[100px] w-[100px] object-cover'
                                />
                                <span className='absolute bottom-[4px] right-[15%] bg-[#d8d8d8] text-[#2d2d2d] text-[12px] font-medium rounded-[15px] px-[6px]'>
                                  Cartoon 3
                                </span>
                              </div>
                            </div>
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </Tab.Pane>
                <Tab.Pane eventKey='style-transfer'>
                  <h1 className='font-semibold text-[20px] mb-[10px] uppercase'>Style Transfer</h1>

                  <div className='flex gap-[6px] flex-wrap'>
                    <div
                      onClick={() =>
                        handleStyleTransfer(
                          "../styleTransferCheckpoints/starryNightTrain",
                          "../styleTransferCheckpoints/starryNightTrain/ckpt-3"
                        )
                      }
                      className='relative flex flex-col justify-center items-center w-fit cursor-pointer'
                    >
                      <img
                        src='../../public/styleTransfer/starryNight.jpg'
                        alt=''
                        className='h-[100px] w-[100px] object-cover'
                      />
                      <span className='absolute bottom-[4px] right-[15%] bg-[#d8d8d8] text-[#2d2d2d] text-[12px] font-medium rounded-[15px] px-[6px]'>
                        StarryNight
                      </span>
                    </div>
                    <div
                      onClick={() =>
                        handleStyleTransfer(
                          "../styleTransferCheckpoints/monaLisaTrain",
                          "../styleTransferCheckpoints/monaLisaTrain/ckpt-3"
                        )
                      }
                      className='relative flex flex-col justify-center items-center w-fit cursor-pointer'
                    >
                      <img
                        src='../../public/styleTransfer/monaLisa.jpg'
                        alt=''
                        className='h-[100px] w-[100px] object-cover'
                      />
                      <span className='absolute bottom-[4px] right-[15%] bg-[#d8d8d8] text-[#2d2d2d] text-[12px] font-medium rounded-[15px] px-[6px]'>
                        Mona Lisa
                      </span>
                    </div>
                    <div
                      onClick={() =>
                        handleStyleTransfer(
                          "../styleTransferCheckpoints/modernArtTrain",
                          "../styleTransferCheckpoints/modernArtTrain/ckpt-1"
                        )
                      }
                      className='relative flex flex-col justify-center items-center w-fit cursor-pointer'
                    >
                      <img
                        src='../../public/styleTransfer/modernArt1.jpg'
                        alt=''
                        className='h-[100px] w-[100px] object-cover'
                      />
                      <span className='absolute bottom-[4px] right-[15%] bg-[#d8d8d8] text-[#2d2d2d] text-[12px] font-medium rounded-[15px] px-[6px]'>
                        ModernArt
                      </span>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey='colorization'>
                  <h1 className='font-semibold text-[20px] mb-[10px] uppercase'>Colorize</h1>
                  <p className='mb-[15px]'>Chuyển ảnh trắng đen thành ảnh màu</p>

                  <div className='flex items-center gap-[10px]'>
                    <img src='../../public/colorization/gray-image.jpg' alt='' className='w-[130px] h-[130px]' />
                    <FaArrowRightLong className='text-[18px] text-[#fff]' />
                    <img src='../../public/colorization/color-image.jpg' alt='' className='w-[130px] h-[130px]' />
                  </div>

                  <button
                    className='flex items-center justify-center py-[4px] px-[15px] rounded-[5px] gap-[4px] bg-[#00a3da] text-white mt-[15px]'
                    onClick={() => handleColorization()}
                  >
                    Bắt đầu chuyển đổi
                  </button>
                </Tab.Pane>
                <Tab.Pane eventKey='colorTransfer'>
                  <h1 className='font-semibold text-[20px] mb-[10px] uppercase'>Color Transfer</h1>
                  <p className='my-[10px]'>Chuyển màu ảnh:</p>

                  <button
                    className='flex items-center justify-center py-[4px] px-[15px] rounded-[5px] gap-[4px] bg-[#00a3da] text-white'
                    onClick={() => {
                      reset();
                      setStartColorTransfer(true);
                    }}
                  >
                    Bắt đầu
                  </button>

                  <p className='my-[10px]'>Chuyển màu theo mẫu có sẵn</p>
                  <div className='flex gap-[6px] flex-wrap'>
                    <div
                      onClick={() => handleColorTransferWithSample("../ColorTransfer/media/reference_images/t1.bmp")}
                      className='relative flex flex-col justify-center items-center w-fit cursor-pointer'
                    >
                      <img
                        src='../../public/colorTransfer/t1.bmp'
                        alt=''
                        className='h-[100px] w-[100px] object-cover'
                      />
                      <span className='absolute bottom-[4px] right-[25%] bg-[#d8d8d8] text-[#2d2d2d] text-[12px] font-medium rounded-[15px] px-[6px]'>
                        Parrots
                      </span>
                    </div>
                    <div
                      onClick={() => handleColorTransferWithSample("../ColorTransfer/media/reference_images/t2.bmp")}
                      className='relative flex flex-col justify-center items-center w-fit cursor-pointer'
                    >
                      <img
                        src='../../public/colorTransfer/t2.bmp'
                        alt=''
                        className='h-[100px] w-[100px] object-cover'
                      />
                      <span className='absolute bottom-[4px] right-[15%] bg-[#d8d8d8] text-[#2d2d2d] text-[12px] font-medium rounded-[15px] px-[6px]'>
                        Helicopter
                      </span>
                    </div>
                    <div
                      onClick={() => handleColorTransferWithSample("../ColorTransfer/media/reference_images/t3.bmp")}
                      className='relative flex flex-col justify-center items-center w-fit cursor-pointer'
                    >
                      <img
                        src='../../public/colorTransfer/t3.bmp'
                        alt=''
                        className='h-[100px] w-[100px] object-cover'
                      />
                      <span className='absolute bottom-[4px] right-[35%] bg-[#d8d8d8] text-[#2d2d2d] text-[12px] font-medium rounded-[15px] px-[6px]'>
                        Caps
                      </span>
                    </div>
                    <div
                      onClick={() => handleColorTransferWithSample("../ColorTransfer/media/reference_images/t4.bmp")}
                      className='relative flex flex-col justify-center items-center w-fit cursor-pointer'
                    >
                      <img
                        src='../../public/colorTransfer/t4.bmp'
                        alt=''
                        className='h-[100px] w-[100px] object-cover'
                      />
                      <span className='absolute bottom-[4px] right-[30%] bg-[#d8d8d8] text-[#2d2d2d] text-[12px] font-medium rounded-[15px] px-[6px]'>
                        Island
                      </span>
                    </div>
                    <div
                      onClick={() => handleColorTransferWithSample("../ColorTransfer/media/reference_images/t5.bmp")}
                      className='relative flex flex-col justify-center items-center w-fit cursor-pointer'
                    >
                      <img
                        src='../../public/colorTransfer/t5.bmp'
                        alt=''
                        className='h-[100px] w-[100px] object-cover'
                      />
                      <span className='absolute bottom-[4px] right-[30%] bg-[#d8d8d8] text-[#2d2d2d] text-[12px] font-medium rounded-[15px] px-[6px]'>
                        Bridge
                      </span>
                    </div>
                    <div
                      onClick={() => handleColorTransferWithSample("../ColorTransfer/media/reference_images/t6.bmp")}
                      className='relative flex flex-col justify-center items-center w-fit cursor-pointer'
                    >
                      <img
                        src='../../public/colorTransfer/t6.bmp'
                        alt=''
                        className='h-[100px] w-[100px] object-cover'
                      />
                      <span className='absolute bottom-[4px] right-[30%] bg-[#d8d8d8] text-[#2d2d2d] text-[12px] font-medium rounded-[15px] px-[6px]'>
                        Beach
                      </span>
                    </div>
                  </div>
                </Tab.Pane>
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
                {startColorTransfer ? (
                  <div className='grid grid-rows-2 w-full h-full p-[15px]'>
                    <div className='grid grid-cols-2'>
                      <div className='relative'>
                        {sourceImage && referenceImage && (
                          <div className='absolute top-[90px] right-[-60px] text-[35px]'>
                            <button
                              onClick={handleColorTransfer}
                              className='flex items-center justify-center py-[4px] px-[6px] rounded-[5px] gap-[4px] bg-[#00a3da] text-white text-[16px]'
                            >
                              Chuyển đổi ảnh
                            </button>
                          </div>
                        )}

                        {!sourceImage && (
                          <div>
                            <input type='file' id='image' className='hidden' onChange={handleSourceChange} />

                            <label htmlFor='image' className='flex flex-col items-center justify-center'>
                              <svg
                                width='80'
                                height='80'
                                viewBox='0 0 130 130'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
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
                              <p>Bấm để chọn ảnh nguồn</p>
                            </label>
                          </div>
                        )}

                        {sourceImage && (
                          <div className='flex items-center justify-center'>
                            <img src={sourceImageURL} alt='Original' className='w-[200px] h-[200px]' />
                          </div>
                        )}
                      </div>
                      <div className='relative'>
                        {!referenceImage && (
                          <div>
                            <input type='file' id='image' className='hidden' onChange={handleReferenceChange} />

                            <label htmlFor='image' className='flex flex-col items-center justify-center'>
                              <svg
                                width='80'
                                height='80'
                                viewBox='0 0 130 130'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
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
                              <p>Bấm để chọn ảnh tham chiếu</p>
                            </label>
                          </div>
                        )}

                        {referenceImage && (
                          <div className='flex flex-col items-center justify-center'>
                            <img src={referenceImageURL} alt='Original' className='w-[200px] h-[200px]' />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='relative flex flex-col items-center justify-center'>
                      {resultImage && (
                        <>
                          <FaEquals className='absolute top-[-50px] right-[48%] text-[35px]' />
                          <img src={resultImage} alt='Pencil Sketch' className='w-[200px] h-[200px]' />
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    {!imageURL && (
                      <div>
                        <input type='file' id='image' className='hidden' onChange={handleImageUpload} />

                        <label htmlFor='image' className='flex flex-col items-center justify-center'>
                          <svg
                            width='80'
                            height='80'
                            viewBox='0 0 130 130'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
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
                        <img src={imageURL} alt='Original' className='w-[300px] h-[300px]' />
                      </div>
                    )}

                    {styledImage && (
                      <>
                        <FaArrowRightLong className='px-[10px] text-[50px] text-[#fff]' />
                        <div>
                          <img src={styledImage} alt='Pencil Sketch' className='w-[300px] h-[300px]' />
                        </div>
                      </>
                    )}
                  </>
                )}

                <div className='absolute top-[100%] left-[-12px] right-0 w-[100%] h-[50px] bg-[#292c31] flex items-center justify-end px-[15px] gap-[10px]'>
                  {startColorTransfer && (
                    <button
                      className='flex items-center justify-center py-[4px] px-[15px] rounded-[5px] gap-[4px] bg-[#da0000] text-white'
                      onClick={() => setStartColorTransfer(false)}
                    >
                      Thoát chuyển đổi ảnh
                    </button>
                  )}
                  {(image || sourceImage || referenceImage) && (
                    <button
                      className='flex items-center justify-center py-[4px] px-[15px] rounded-[5px] gap-[4px] bg-[#69da00] text-white'
                      onClick={() => reset()}
                    >
                      Đổi ảnh
                    </button>
                  )}
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
