const AISection = () => {
  return (
    <section className='bg-[#0a0f20] flex flex-col gap-[125px] py-[180px]'>
      <div className='items-center flex flex-col'>
        <span className='font-semibold uppercase bg-[#5463bf] text-[1rem] tracking-[3px] mb-[10px] pt-[4px] pr-[15px] pb-[2px] pl-[18px]'>
          Sự Tài năng không giới hạn
        </span>
        <h2 className='text-[3rem] font-black text-center uppercase'>Công cụ Nghệ thuật Sáng tạo AI</h2>
        <p className='max-w-[800px] mt-[10px] text-[#ffffffcc] text-center'>
          Khám phá Công cụ Tạo Hình Ảnh Sáng tạo mới của Pixlr sử dụng trí tuệ nhân tạo mạnh mẽ, mở ra vô số khả năng
          sáng tạo. Hoàn hảo cho cả người mới bắt đầu và những chuyên gia lão luyện, những công cụ này định nghĩa lại
          biểu hiện nghệ thuật với công nghệ trí tuệ nhân tạo trực quan, làm thay đổi quy trình sáng tạo của bạn.
        </p>
      </div>

      <div className='flex flex-row gap-[40px] mx-auto w-[90%] relative'>
        <div className='min-h-[400px] w-[40%] z-4'>
          <span className='text-[#7286ff] text-[.875rem] text-left leading-[1.4] tracking-[4px] uppercase font-semibold'>
            Nghệ thuật không giới hạn
          </span>
          <h2 className='text-[2rem] text-[#fff] font-black'>Động lực Tạo Hình Ảnh AI!</h2>
          <p className='text-[#ffffffcc] mt-[10px]'>
            Nâng cao sáng tạo của bạn với trình tạo hình ảnh AI Text to Image cách mạng, làm thay đổi cách bạn chuyển
            đổi văn bản đơn giản thành tác phẩm nghệ thuật hấp dẫn về mặt hình ảnh. Hãy giải phóng trí tưởng tượng của
            bạn và tạo ra những kiệt tác tuyệt vời do AI tạo ra mà chắc chắn sẽ thu hút và truyền cảm hứng cho khán giả
            của bạn.
          </p>
          <a
            href=''
            className='bg-[#5463bf] text-[1rem] font-semibold h-[44px] min-h-[40px] mt-[20px] px-[40px] rounded-[50px] cursor-pointer hover:shadow-[0_0_15px_#5463bf] inline-flex justify-center items-center select-none'
          >
            Kiểm tra Trình Tạo Hình Ảnh
          </a>
        </div>

        <div className='w-[60%] min-h-[400px] relative'>
          <div className='relative flex items-center justify-center min-h-[400px] min-w-[400px] z-2 group '>
            <img
              src='https://pixlr.com/images/index/ai-image-generator-one.webp'
              alt=''
              className='max-w-[300px] translate-x-[-60%] group-hover:translate-x-[-80%] w-[45%] group-hover:w-[50%] z-2 h-auto absolute rounded-[25px]'
              style={{
                transition: "all .2s ease-in-out",
              }}
            />
            <img
              src='https://pixlr.com/images/index/ai-image-generator-two.webp'
              alt=''
              className='max-w-[350px] w-[60%] z-3 h-auto absolute rounded-[25px]'
              style={{
                boxShadow: "0 8px 24px rgba(17,17,26,.1),0 16px 56px rgba(17,17,26,.1),0 24px 80px rgba(17,17,26,.1)",
                transition: "all .2s ease-in-out",
              }}
            />
            <img
              src='https://pixlr.com/images/index/ai-image-generator-three.webp'
              alt=''
              className='max-w-[300px] translate-x-[60%] group-hover:translate-x-[80%] w-[45%] group-hover:w-[50%] z-2 h-auto absolute rounded-[25px]'
              style={{
                transition: "all .2s ease-in-out",
              }}
            />
          </div>
        </div>
      </div>

      <div className='flex flex-row gap-[40px] mx-auto w-[90%] relative'>
        <div className='w-[60%] min-h-[400px] relative'>
          <div className='relative flex items-center justify-center min-h-[400px] min-w-[400px] z-2 group '>
            <img
              src='https://pixlr.com/images/index/ai-generative-fill-before.webp'
              alt=''
              className='max-w-[330px] translate-x-[-25%] translate-y-[-5%] group-hover:translate-x-[-35%] group-hover:translate-y-[-10%] w-[60%] group-hover:w-[50%] z-2 h-auto absolute rounded-[25px]'
              style={{
                transition: "all .2s ease-in-out",
              }}
            />
            <img
              src='https://pixlr.com/images/index/ai-generative-fill-after.webp'
              alt=''
              className='max-w-[330px] translate-x-[25%] translate-y-[5%] group-hover:translate-x-[35%] group-hover:translate-y-[10%] w-[60%] z-2 h-auto absolute rounded-[25px]'
              style={{
                boxShadow: "0 5px 15px rgba(0,0,0,.4)",
                transition: "all .2s ease-in-out",
              }}
            />
          </div>
        </div>

        <div className='min-h-[400px] w-[40%] z-4'>
          <span className='text-[#7286ff] text-[.875rem] text-left leading-[1.4] tracking-[4px] uppercase font-semibold'>
            Nghệ thuật không giới hạn
          </span>
          <h2 className='text-[2rem] text-[#fff] font-black'>Tuyệt vời Đổ Màu AI!</h2>
          <p className='text-[#ffffffcc] mt-[10px]'>
            Từ việc hình thành các ý tưởng sáng tạo đến việc thực hiện các chỉnh sửa và hoàn thiện phức tạp, Generative
            Fill có thể giúp bạn nhanh chóng thực hiện ý tưởng của mình trong khi vẫn cung cấp cho bạn hoàn toàn kiểm
            soát trên mỗi sáng tạo.
          </p>
          <a
            href=''
            className='bg-[#5463bf] text-[1rem] font-semibold h-[44px] min-h-[40px] mt-[20px] px-[40px] rounded-[50px] cursor-pointer hover:shadow-[0_0_15px_#5463bf] inline-flex justify-center items-center select-none'
          >
            Kiểm tra Đổ Màu Sáng tạo
          </a>
        </div>
      </div>

      <div className='flex flex-row gap-[40px] mx-auto w-[90%] relative'>
        <div className='min-h-[400px] w-[40%] z-4'>
          <span className='text-[#7286ff] text-[.875rem] text-left leading-[1.4] tracking-[4px] uppercase font-semibold'>
            Nghệ thuật không giới hạn
          </span>
          <h2 className='text-[2rem] text-[#fff] font-black'>Xem thêm với AI Generative Expand!</h2>
          <p className='text-[#ffffffcc] mt-[10px]'>
            Khám phá xa hơn ngoại vi của bức tranh của bạn với Generative Expand, làm cho hình ảnh của bạn phù hợp trong
            bất kỳ khía cạnh nào mà không cần cắt bớt phần tốt nhất. Chỉ cần mở rộng ở bất kỳ hướng nào và nội dung mới
            sẽ hòa quyện hoàn hảo với hình ảnh.
          </p>
          <a
            href=''
            className='bg-[#5463bf] text-[1rem] font-semibold h-[44px] min-h-[40px] mt-[20px] px-[40px] rounded-[50px] cursor-pointer hover:shadow-[0_0_15px_#5463bf] inline-flex justify-center items-center select-none'
          >
            Kiểm tra Sự Mở Rộng Sáng tạo
          </a>
        </div>

        <div className='w-[60%] min-h-[400px] relative'>
          <div className='relative flex items-center justify-center min-h-[400px] min-w-[400px] z-2 group '>
            <img
              src='https://pixlr.com/images/index/generative-expand-back.webp'
              alt=''
              className='max-w-[300px] translate-x-[-60%] group-hover:translate-x-[-80%] w-[45%] group-hover:w-[50%] z-2 h-auto absolute rounded-[25px]'
              style={{
                transition: "all .2s ease-in-out",
              }}
            />
            <img
              src='https://pixlr.com/images/index/generative-expand-front.webp'
              alt=''
              className='max-w-[350px] w-[60%] z-3 h-auto absolute rounded-[25px]'
              style={{
                boxShadow: "0 8px 24px rgba(17,17,26,.1),0 16px 56px rgba(17,17,26,.1),0 24px 80px rgba(17,17,26,.1)",
                transition: "all .2s ease-in-out",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
