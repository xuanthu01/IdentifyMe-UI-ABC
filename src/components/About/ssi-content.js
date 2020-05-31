export const content = `
# SELF-SOVEREIGN IDENTITY
## Các vấn đề đối với cơ chế định danh hiện tại
### Định danh dùng username/password
- User phải sử dụng username/password để định danh cho từng tổ chức, website,…:
  - Có quá nhiều username/password để ghi nhớ, điều này dẫn đến user phải đặt password dễ nhớ hoặc cùng chung 1 password cho nhiều tổ chức/website =\\&gt; tồn tại khá nhiều rủi ro.
  - Cơ chế khôi phục mật khẩu cũng là 1 con đường dễ bị hacker lợi dụng
  - Dễ bị rò rỉ thông tin (cơ bản nhất là username/password) nếu dữ liệu bị bán hoặc bị hack.
- Để quản lý nhiều password, hiện nay cũng có khá nhiều công cụ hỗ trợ, hoặc cách tiếp cận mới là định danh thông qua các nhà cung cấp định danh (Identity Providers) như Facebook, Google. Các website nhỏ có thể dùng cách tiếp cận này để định danh, nhưng cũng tồn tại nhiều rủi ro, và phổ biến nhất là kiểu tấn công phishing – dạng này còn nguy hiểm hơn cả vì hacker có thể lấy được tài khoản của Identity Providers – đôi khi kiểu tấn công này còn ảnh hưởng đến cả Two Factor Password, One Time Password (chẳng hạn như vụ phishing ngân hàng VPBank)
### Định danh tập trung
- Phần lớn các cơ chế định danh hiện nay đều được quản lý tập trung
- Quản lý tập trung cũng gây ra khá nhiều rủi ro, một vấn đề lớn là cơ quan quản lý có thể lấy đi định danh của ta bất cứ lúc nào.
- Hoặc, nếu ta bị xâm phạm, định danh của ta có thể bị sử dụng cho nhiều mục đích xấu. (Trường hợp xấu nhất là người quản lý có thể xâm phạm bất hợp pháp định danh của ta.)
- Và hơn nữa, nếu cơ quan quản lý định danh này bị tấn công sẽ gây ảnh hưởng đến rất nhiều user.
### Tồn tại tương quan không mong muốn
Việc sử dụng định danh phổ biến trên nhiều trang web tạo ra một vấn đề - tương quan. Tương quan trong trường hợp này là liên kết mà không có sự đồng ý về danh tính duy nhất trên nhiều hệ thống. Điều này chủ yếu gây ra bởi quảng cáo (thông qua cookie) và làm cho quyền riêng tư của user bị xâm phạm.
Chắc chắn rằng không user nào đồng ý cho phép một tổ chức/website thu thập thông tin cá nhân của mình. Nhưng các tổ chức/website này đã tương quan dữ liệu trên nhiều trang web &quot;đối tác&quot; để thu thập dữ liệu của mỗi người – và họ sẽ lần lượt bán cho bất kỳ ai có khả năng mua.
Identity Providers (IdPs) cũng là một mô hình tương quan (mặc dù ta chấp nhận – đồng ý với các điều khoản), IdPs có thể theo dõi user sử dụng các trang web khác và từ đó, IdPs có thể hiểu hơn về con người của bạn.
### Vi phạm dữ liệu
- Dữ liệu định danh là thông tin rất có giá trị đối với hacker, do đó, các kho lưu trữ định danh lớn luôn là mục tiêu của hacker. (có thể bao gồm cả thông tin về ngân hàng,…)
- Không thể tin tưởng vào các thông tin cá nhân được công khai.
---
**Các mô hình định danh**
Hệ thống định danh hiện nay được áp dụng có 2 loại chính:
- Data Silos: Tổ chức, doanh nghiệp tự đưa ra hệ thống định danh riêng của mình. Như vậy người dùng tham gia 100 website thì phải có 100 tài khoản => trải nghiệm người dùng kém.
- Federation models: Một đơn vị nào đó đứng ra làm dịch vụ (Identity Providers - IDPs) xác định danh tính. Ví dụ: Đăng nhập với Google hay Facebook => cải thiện hơn nhưng họ thường đặt vấn đề kinh tế đối với các dữ liệu người dùng này.

---
## Self-Sovereign Identity - Từ rủi ro đến giải pháp
        Trên thực tế với mô hình quản lý danh tính hiện tại, đã có nhiều vụ việc nghiêm trọng xảy ra đối với việc xâm phạm dữ liệu người dùng. Điển hình như ở trên thế giới, năm 2018, Facebook đã bị xử phạt lên đến 5 tỷ đô la Mỹ vì để cho công ty Cambridge Analytica thu thập dữ liệu của hàng chục triệu người. Hay ở Việt Nam trong năm 2019, ngân hàng Maritime Bank bị dính nghi vấn để lộ thông tin của hơn 2 triệu khách hàng, nếu điều này đúng là sự thật thì đại diện ngân hàng sẽ chịu phạt hành chính hay hình sự tùy vào mức độ theo luật pháp Việt Nam. 
        Hai ví dụ trên chỉ là phần nhỏ trong rất nhiều vụ xâm phạm dữ liệu người dùng đã xảy ra, bộc lộ những điểm yếu điển hình của một hệ thống định danh tập trung. Chúng không chỉ xâm phạm quyền riêng tư, gây hoang mang cho người dùng mà còn gây thiệt hại rất lớn đối với uy tín, tài chính của tổ chức cung cấp dịch vụ.
        Vậy liệu có một mô hình nào mà chúng ta có thể tự quản lý thông tin định danh của mình. Mà các thông tin ấy vẫn đảm bảo độ tin cậy cao và có thể xác minh được?
        Mô hình Self-Sovereign Identity (SSI) được ra đời để giải quyết điều đó.
        Về cơ bản, SSI là một mô hình cho phép các thực thể tham gia được tự mình kiểm soát thông tin định danh kỹ thuật số, cách thức, thời điểm các thông tin này được cung cấp cho các bên khác; một khi được chia sẻ, các thông tin định danh sẽ được thực hiện theo một phương thức tin cậy. Hệ thống SSI hoạt động bởi công nghệ Blockchain và các công nghệ mật mã mạnh mẽ, không hề có một thực thể trung tâm nào nắm giữ dữ liệu của người dùng. Một hệ thống SSI cho phép chúng ta lưu trữ các thông tin định danh, trình diện cho người khác và có thể xác minh chúng thông qua mật mã. Tổ chức Sovrin cho rằng *“SSI mang lại quyền tự do và quyền tự chủ cá nhân tương tự cho internet trong một hệ thống quản lý danh tính an toàn và đáng tin cậy”*`;
