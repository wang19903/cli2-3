這是vue2電商作品<br>  
RWD響應式網頁，前台商品連結及介紹，點選加入購物車進入結帳頁面，結帳完畢導回首頁繼續選購。   
後台管理商品上架下架，優惠券折扣%數及有效期限。  
![image](https://github.com/wang19903/cli2-3/blob/master/homepage.gif)  
#RWD，後方白色是遮蔽桌面

後台產品列表、訂單詳細設定、優惠券
![image](https://github.com/wang19903/cli2-3/blob/master/backview.gif)
![image](https://github.com/wang19903/cli2-3/blob/master/backse.gif)


使用到的技術  
html,css,javascript  
scss,bootstrap  
vue,vuex,vue-cli3
  
 
下載後 執行npm run serve可觀看檔案  
或網址 https://wang19903.github.io/cli2-3/  
  
謝謝，下面是詳細說明。  
  
html  
用bootstrap快速製作樣板，並製作成RWD網頁，script的部分放在下面讓網頁樣式可以先印出來，盡量壓縮圖片檔使網頁可以加載的更快。  
  
css
在css部分為了避免重複，每一個頁面都有自己獨立一頁的scss作個別設定，然後匯集在all.scss。  
在all.scss的地方做共通設定，並且盡量使用變數和參數方便管理。  
opening.scss是首頁的過場動畫，因為使用者對網頁的動畫有興趣，所以試著自己刻出一個動畫也當作是animation的練習。  
  
js  
用vue-cli設定及安裝套件，然後用vuex來串接各個頁面的資料。  
為了確保每個網頁都能正確讀取購物車資料，所以每物在購買商品功能以及刪除商品功能都會向vuex確認一次資料。  
在使用者購買的過程中選購或刪除商品不會往後端送資料降低後端伺服器負擔，只有到進入結帳頁面時才會送出資料到後端。  
後台編輯商品可以選擇要不要上架，確認圖片格式，確認顧客訂單狀況，編輯顧客訂單，編輯優惠券及期限。  
 
