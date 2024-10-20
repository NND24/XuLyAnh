const PhotoEditorSection = () => {
  return (
    <section
      className='bg-[#0a0f20] flex flex-col min-h-screen relative overflow-hidden'
      style={{
        backgroundImage: "radial-gradient(ellipse 40% 100% at 60% -10%,rgba(119,138,232,.3),rgba(119,138,232,0))",
        backgroundRepeat: "no-repeat",
      }}
      id='photo-editor-section'
    >
      <div className='flex-grow-[0.6] min-h-[150px]'></div>

      <div className='relative mx-auto w-[90%]'>
        <div className='mx-auto max-w-[800px] text-center'>
          <h1 className='text-[#ffffffbb] text-[1.6rem] font-semibold leading-[3rem]'>
            Trực tuyến Miễn phí
            <strong
              className='block text-[6rem] font-black leading-[7rem] mb-[10px] uppercase'
              style={{
                background: "linear-gradient(141deg,#9c26d7,#1eb1db)",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "cover",
              }}
            >
              Chuyển đổi
              <br />
              xử lý ảnh
            </strong>
            Máy tạo hình ảnh AI và công cụ Thiết kế AI
          </h1>
          <p className='text-[#ffffffbb] text-[18px] mt-[20px] px-[50px]'>
            Bộ ứng dụng cho tất cả nhu cầu chỉnh sửa ảnh và thiết kế sáng tạo của bạn trực tiếp trên trình duyệt web của
            bạn, trên điện thoại thông minh hoặc máy tính để bàn, hoàn toàn miễn phí. Giới hạn duy nhất là trí tưởng
            tượng của bạn!
          </p>
          <div className='flex items-center content-center justify-center mt-[60px] gap-[30px]'>
            <div className='bg-[#00000038] border-[#965cc957] border-[2px] text-[#ffffffcc] text-[17px] font-normal h-[55px] px-[40px] rounded-[50px] flex items-center gap-2'>
              <img
                className='opacity-80 w-[24px] h-[24px]'
                src='https://pixlr.com/images/index/image-editor.svg'
                alt=''
              />
              <span>Chỉnh sửa ảnh AI mở</span>
            </div>
            <div className='bg-[#00000038] border-[#965cc957] border-[2px] text-[#ffffffcc] text-[17px] font-normal h-[55px] px-[40px] rounded-[50px] flex items-center gap-2'>
              <img
                className='opacity-80 w-[24px] h-[24px]'
                src='https://pixlr.com/images/index/image-generator.svg'
                alt=''
              />
              <span>Chỉnh sửa ảnh AI mở</span>
            </div>
          </div>
        </div>
      </div>

      <div className='flex-grow-[0.6] min-h-[150px]'></div>
    </section>
  );
};

export default PhotoEditorSection;
