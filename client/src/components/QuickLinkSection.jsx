const QuickLinkSection = () => {
  return (
    <section
      className='relative text-[#fff] min-h-[500px] py-[80px]'
      style={{
        backgroundImage: "linear-gradient(120deg,#8750ad,#7785d9)",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className='flex flex-col items-center'>
        <span className='bg-[#7e3299] font-semibold uppercase text-[1rem] tracking-[3px] mb-[10px] pt-[4px] pr-[15px] pb-[2px] pl-[18px]'>
          Liên kết nhanh
        </span>
        <h2 className='text-[3rem] font-black text-center uppercase'>Bắt đầu ngay</h2>
        <p className='max-w-[800px] mt-[10px] text-[#ffffffcc] text-center'>
          Ở đây, chúng tôi đã thu thập các tính năng Generative AI và chỉnh sửa ảnh được sử dụng nhiều nhất mà mọi người
          đang tìm kiếm!
        </p>
      </div>

      <div className='mx-auto w-[90%] relative'>
        <ul className='grid grid-cols-3 gap-[20px] mt-[20px]'>
          <li className=''>
            <a
              href=''
              className='items-center bg-[#ffffff1a] rounded-[10px] text-[#fff] cursor-pointer flex gap-[10px] text-[15px] h-[50px] opacity-80 overflow-hidden px-[20px] hover:bg-[#724e7f] hover:opacity-100'
              style={{
                transition: "all .15s linear",
              }}
            >
              <img src='https://pixlr.com/img/icon/ai.svg' alt='' className='w-[22px] h-[22px]' />
              Máy tạo hình ảnh AI
            </a>
          </li>
          <li className=''>
            <a
              href=''
              className='items-center bg-[#ffffff1a] rounded-[10px] text-[#fff] cursor-pointer flex gap-[10px] text-[15px] h-[50px] opacity-80 overflow-hidden px-[20px] hover:bg-[#724e7f] hover:opacity-100'
              style={{
                transition: "all .15s linear",
              }}
            >
              <img src='https://pixlr.com/img/tool/face-swap.svg' alt='' className='w-[22px] h-[22px]' />
              Đổi mặt với công cụ
            </a>
          </li>
          <li className=''>
            <a
              href=''
              className='items-center bg-[#ffffff1a] rounded-[10px] text-[#fff] cursor-pointer flex gap-[10px] text-[15px] h-[50px] opacity-80 overflow-hidden px-[20px] hover:bg-[#724e7f] hover:opacity-100'
              style={{
                transition: "all .15s linear",
              }}
            >
              <img src='https://pixlr.com/img/tool/cutout.svg' alt='' className='w-[22px] h-[22px]' />
              Xóa Nền AI
            </a>
          </li>
          <li className=''>
            <a
              href=''
              className='items-center bg-[#ffffff1a] rounded-[10px] text-[#fff] cursor-pointer flex gap-[10px] text-[15px] h-[50px] opacity-80 overflow-hidden px-[20px] hover:bg-[#724e7f] hover:opacity-100'
              style={{
                transition: "all .15s linear",
              }}
            >
              <img src='https://pixlr.com/img/tool/eraser.svg' alt='' className='w-[22px] h-[22px]' />
              Xóa Đối tượng AI
            </a>
          </li>
          <li className=''>
            <a
              href=''
              className='items-center bg-[#ffffff1a] rounded-[10px] text-[#fff] cursor-pointer flex gap-[10px] text-[15px] h-[50px] opacity-80 overflow-hidden px-[20px] hover:bg-[#724e7f] hover:opacity-100'
              style={{
                transition: "all .15s linear",
              }}
            >
              <img src='https://pixlr.com/img/icon/template.svg' alt='' className='w-[22px] h-[22px]' />
              Photo Collage Maker
            </a>
          </li>
          <li className=''>
            <a
              href=''
              className='items-center bg-[#ffffff1a] rounded-[10px] text-[#fff] cursor-pointer flex gap-[10px] text-[15px] h-[50px] opacity-80 overflow-hidden px-[20px] hover:bg-[#724e7f] hover:opacity-100'
              style={{
                transition: "all .15s linear",
              }}
            >
              <img src='https://pixlr.com/img/tool/crop.svg' alt='' className='w-[22px] h-[22px]' />
              Cắt Ảnh
            </a>
          </li>
          <li className=''>
            <a
              href=''
              className='items-center bg-[#ffffff1a] rounded-[10px] text-[#fff] cursor-pointer flex gap-[10px] text-[15px] h-[50px] opacity-80 overflow-hidden px-[20px] hover:bg-[#724e7f] hover:opacity-100'
              style={{
                transition: "all .15s linear",
              }}
            >
              <img src='https://pixlr.com/img/tool/generative-fill.svg' alt='' className='w-[22px] h-[22px]' />
              Điền mẫu AI
            </a>
          </li>
          <li className=''>
            <a
              href=''
              className='items-center bg-[#ffffff1a] rounded-[10px] text-[#fff] cursor-pointer flex gap-[10px] text-[15px] h-[50px] opacity-80 overflow-hidden px-[20px] hover:bg-[#724e7f] hover:opacity-100'
              style={{
                transition: "all .15s linear",
              }}
            >
              <img src='https://pixlr.com/img/tool/generative-expand.svg' alt='' className='w-[22px] h-[22px]' />
              Mở rộng Sinh sáng
            </a>
          </li>
          <li className=''>
            <a
              href=''
              className='items-center bg-[#ffffff1a] rounded-[10px] text-[#fff] cursor-pointer flex gap-[10px] text-[15px] h-[50px] opacity-80 overflow-hidden px-[20px] hover:bg-[#724e7f] hover:opacity-100'
              style={{
                transition: "all .15s linear",
              }}
            >
              <img src='https://pixlr.com/img/tool/resize.svg' alt='' className='w-[22px] h-[22px]' />
              Thay đổi Kích thước Ảnh
            </a>
          </li>
          <li className=''>
            <a
              href=''
              className='items-center bg-[#ffffff1a] rounded-[10px] text-[#fff] cursor-pointer flex gap-[10px] text-[15px] h-[50px] opacity-80 overflow-hidden px-[20px] hover:bg-[#724e7f] hover:opacity-100'
              style={{
                transition: "all .15s linear",
              }}
            >
              <img src='https://pixlr.com/img/tool/retouch.svg' alt='' className='w-[22px] h-[22px]' />
              Chạm nhẹ
            </a>
          </li>
          <li className=''>
            <a
              href=''
              className='items-center bg-[#ffffff1a] rounded-[10px] text-[#fff] cursor-pointer flex gap-[10px] text-[15px] h-[50px] opacity-80 overflow-hidden px-[20px] hover:bg-[#724e7f] hover:opacity-100'
              style={{
                transition: "all .15s linear",
              }}
            >
              <img src='https://pixlr.com/img/tool/layout.svg' alt='' className='w-[22px] h-[22px]' />
              Mẫu Thiết kế
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default QuickLinkSection;
