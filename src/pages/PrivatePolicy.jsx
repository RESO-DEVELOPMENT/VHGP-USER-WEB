import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import { useEffect } from "react";

export default function PrivatePolicy() {
  const { setIsHeaderOrder, mobileMode, setHeaderInfo, isSearchHeader } =
    useContext(AppContext);
  useEffect(() => {
    setHeaderInfo({ isSearchHeader: false, title: "Private & Policy" });
  }, []);
  return (
    <div
      style={{
        padding: mobileMode ? "100px 40px 0px 40px " : "100px 30px 0px 30px",
      }}
    >
      <h2 style={{ textAlign: "", fontSize: "16px" }}>
        Điều khoản sử dụng của ứng dụng VHGP - Tiện ích cư dân. Ứng dụng đặt đồ
        ăn và hàng hoá cư dân Vinhome GrandPark
      </h2>
      <p style={{ marginTop: "20px", textAlign: "justify" }}>
        Chào mừng bạn đến với ứng dụng VHGP - Tiện ích cư dân. Ứng dụng đặt đồ
        ăn và hàng hoá cư dân Vinhome GrandPark (gọi tắt là "ứng dụng"). Đây là
        một ứng dụng do Công ty TNHH VHGP phát triển và quản lý, nhằm cung cấp
        cho cư dân Vinhome GrandPark một giải pháp tiện lợi và nhanh chóng để
        đặt đồ ăn và hàng hoá từ các nhà cung cấp uy tín trong khu vực. Khi bạn
        sử dụng ứng dụng, bạn đồng ý tuân thủ các điều khoản sử dụng sau đây:
      </p>
      <p style={{ marginTop: "20px", textAlign: "justify" }}>
        - Bạn phải là cư dân Vinhome GrandPark hoặc có sự cho phép của cư dân
        Vinhome GrandPark để sử dụng ứng dụng. Bạn phải cung cấp thông tin chính
        xác và đầy đủ về tên, số điện thoại, địa chỉ giao hàng và phương thức
        thanh toán khi đăng ký tài khoản và đặt hàng trên ứng dụng. <br /> - Bạn
        không được sử dụng ứng dụng cho bất kỳ mục đích bất hợp pháp, vi phạm
        quyền của bên thứ ba, gây rối loạn trật tự công cộng hoặc làm tổn hại
        đến uy tín của Công ty TNHH VHGP hoặc các nhà cung cấp trên ứng dụng.{" "}
        <br /> - Bạn chịu trách nhiệm về việc bảo mật tài khoản và mật khẩu của
        mình, và không được chia sẻ hoặc cho phép người khác sử dụng tài khoản
        của mình. Bạn phải thông báo ngay cho Công ty TNHH VHGP nếu phát hiện
        bất kỳ hành vi xâm nhập, lạm dụng hoặc vi phạm an ninh của tài khoản của
        mình. <br /> - Bạn phải thanh toán đầy đủ và kịp thời cho các đơn hàng
        mà bạn đã đặt trên ứng dụng, theo giá và phí đã được niêm yết trên ứng
        dụng. Bạn có thể chọn thanh toán bằng tiền mặt, thẻ tín dụng, thẻ ghi nợ
        hoặc ví điện tử khi đặt hàng. Bạn không được hủy đơn hàng sau khi đã xác
        nhận hoặc khi hàng đã được giao cho nhân viên vận chuyển. <br /> - Bạn
        có quyền yêu cầu hoàn trả hoặc đổi trả hàng nếu hàng bị hư hỏng, sai sót
        hoặc không đúng với mô tả trên ứng dụng. Bạn phải liên hệ với Công ty
        TNHH VHGP hoặc nhà cung cấp trong vòng 24 giờ kể từ khi nhận hàng để
        được hỗ trợ. Bạn phải giữ nguyên tình trạng và bao bì của hàng khi yêu
        cầu hoàn trả hoặc đổi trả. <br /> - Công ty TNHH VHGP có quyền thay đổi,
        cập nhật hoặc ngừng cung cấp ứng dụng bất kỳ lúc nào mà không cần thông
        báo trước. Công ty TNHH VHGP không chịu trách nhiệm về bất kỳ thiệt hại
        nào do việc thay đổi, cập nhật hoặc ngừng cung cấp ứng dụng gây ra cho
        bạn hoặc bên thứ ba. <br /> - Công ty TNHH VHGP có quyền đình chỉ hoặc
        xóa tài khoản của bạn nếu bạn vi phạm bất kỳ điều khoản sử dụng nào của
        ứng dụng. Công ty TNHH VHGP cũng có quyền từ chối cung cấp ứng dụng cho
        bạn nếu bạn có hành vi gian lận, lừa đảo hoặc làm tổn hại đến uy tín của
        Công ty TNHH VHGP hoặc các nhà cung cấp trên ứng dụng. Cảm ơn bạn đã sử
        dụng ứng dụng VHGP <br /> - Ứng dụng đặt đồ ăn và hàng hoá cư dân
        Vinhome GrandPark. Chúc bạn có những trải nghiệm tuyệt vời với ứng dụng!
      </p>
    </div>
  );
}
