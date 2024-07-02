// const url = "http://localhost:8080/post";

// const urlCurrent = "http://localhost:8080/user/current";

// function sessionCurrent() {
//   // 로그인 유지 확인 코드
//   axios
//     .get(urlCurrent, { withCredentials: true })
//     .then((response) => {
//       console.log("데이터", response);
//       if (response.data.userId == "anonymousUser") {
//         alert("로그인이 필요합니다.");
//         window.location.href = "login.html";
//       } else {
//         //   if (response.data.userId != "anonymousUser") {
//         console.log("세션 유지");
//         if (response.status == 200) {
//           console.log(response.data.userId + "님, 환영합니다.");
//           document.querySelector(".logout").classList.remove("hidden");
//           document.querySelector(".login").classList.add("hidden");
//           document.querySelector(".join").classList.add("hidden");
//         }
//       }
//     })
//     .catch((error) => {
//       console.log("에러 발생", error);
//     });
// }

// sessionCurrent();
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const url = "http://localhost:8080/board/all";
const freeBoardurl = "http://localhost:8080/post/freeBoard/"+id;
const urlPostReverse = "http://localhost:8080/board/all/reverse";

// let board1;
let board2 = ""
let board3 = ""
const tbody = document.querySelector(".boardBody");
const basic = document.querySelectorAll(".basic");

function getPostToBoard() {
axios
.get(urlPostReverse,{withCredentials:true})
.then((response) =>{
  console.log("데이터 : " , response.data);
  let boardID1 = [];
  let boardID2 = [];
  let boardID3 = [];
  let board1;
  console.log(response.data[0]);
  console.log(response.data[0].board.boardNumber);

  
    for(i = 0; i < response.data.length; i++){
      if(response.data[i].board.boardNumber == 1){
        boardID1.push(response.data[i]);
      }else if(response.data[i].board.boardNumber == 2){
        boardID2.push(response.data[i]);
      }else{
        boardID3.push(response.data[i]);
      }
    }
    
      displayPost(response.data)
      for (let index = 0; index < response.data.length; index++) {
        console.log("[index] : ", response.data[index]);
        if (response.data[index].board.boardNumber == 1) {
          board1 = response.data[index].board.boardNumber;
          console.log("response.data[index].board.boardNumber : ", response.data[index].board.boardNumber);
        }
        
      }
      
      console.log("board1:",board1);
        
    
    // 카테고리 제목 선택

document.querySelector("#boardTabMenu01").addEventListener("click", (e) => {
  console.log("tab01 clicked!!");

  document.querySelector(".boardSearchTitle").classList.remove("hidden");
  document.querySelector(".boardSearchQna").classList.add("hidden");
  document.querySelector(".boardSearchFaq").classList.add("hidden");
  document.querySelector("#boardTabMenu01").classList.add("boardID1");
  if(document.querySelector(".boardID2")){
    document.querySelector("#boardTabMenu02").classList.remove("boardID2");
  }else if(document.querySelector(".boardID3")){
    document.querySelector("#boardTabMenu03").classList.remove("boardID3");
  }

  if(document.getElementsByClassName("boardID1")){
  
    displayPost(boardID1)
  for (let index = 0; index < response.data.length; index++) {
    console.log("[index] : ", response.data[index]);
    if (response.data[index].board.boardNumber == 1) {
      board1 = response.data[index].board.boardNumber;
      console.log("response.data[index].board.boardNumber : ", response.data[index].board.boardNumber);
    }
    
  }
  }
});

document.querySelector("#boardTabMenu02").addEventListener("click", (e) => {
  console.log("tab02 clicked!!");

  document.querySelector(".boardSearchTitle").classList.add("hidden");
  document.querySelector(".boardSearchQna").classList.remove("hidden");
  document.querySelector(".boardSearchFaq").classList.add("hidden");
  document.querySelector("#boardTabMenu02").classList.add("boardID2");
  if(document.querySelector(".boardID1")){
    document.querySelector("#boardTabMenu01").classList.remove("boardID1");
  }else if(document.querySelector(".boardID3")){
    document.querySelector("#boardTabMenu03").classList.remove("boardID3");
  }
  if(document.getElementsByClassName("boardID2")){
   displayPost(boardID2)
  for (let index = 0; index < response.data.length; index++) {
    console.log("[index] : ", response.data[index]);
    if (response.data[index].board.boardNumber == 1) {
      board1 = response.data[index].board.boardNumber;
      console.log("response.data[index].board.boardNumber : ", response.data[index].board.boardNumber);
    }
    
  }
  }

});

document.querySelector("#boardTabMenu03").addEventListener("click", (e) => {
  console.log("tab03 clicked!!");

  document.querySelector(".boardSearchTitle").classList.add("hidden");
  document.querySelector(".boardSearchQna").classList.add("hidden");
    document.querySelector(".boardSearchFaq").classList.remove("hidden");
    document.querySelector("#boardTabMenu03").classList.add("boardID3");
    if(document.querySelector(".boardID2")){
      document.querySelector("#boardTabMenu02").classList.remove("boardID2");
    }else if(document.querySelector(".boardID1")){
      document.querySelector("#boardTabMenu01").classList.remove("boardID1");
    }
    if(document.getElementsByClassName("boardID3")){
       displayPost(boardID3)
    for (let index = 0; index < response.data.length; index++) {
      console.log("[index] : ", response.data[index]);
      if (response.data[index].board.boardNumber == 1) {
        board1 = response.data[index].board.boardNumber;
        console.log("response.data[index].board.boardNumber : ", response.data[index].board.boardNumber);
      }
      
    }} 
});




  
})
.catch((error) =>{
  console.log("에러 발생 : ", error);
})
}
getPostToBoard()


function displayPost(data) {
  if(basic){
    basic.forEach(e =>{
      e.remove();
    })
  }
  
  let totalPrice = 0;
  
  data.forEach((data, index) => {
    // 태그 요소 생성
    const tr = document.createElement("tr");
    const num = document.createElement("td");
    const postTitle = document.createElement("td");
    const userId = document.createElement("td");
    const postContent = document.createElement("td");
    // const search = document.createElement("td");


    // 클래스 이름 생성
    num.classList.add("boardNum1");
    postTitle.classList.add("boardPostTitle1");
    userId.classList.add("boardUserId1");
    postContent.classList.add("boardPostContent1");
    tr.classList.add("basic");
    
    // 태그 속성 추가
    num.textContent = data.postId; 
    postTitle.textContent = data.postTitle;
    userId.textContent = data.userId.userId;
    postContent.textContent = data.postDate.substring(0,10);
    // search.textContent= data.search;
    
    
    // appendChild 부모,자식 위치 설정
    tr.appendChild(num);
    tr.appendChild(postTitle);
    tr.appendChild(userId);
    tr.appendChild(postContent);
    // tr.appendChild(search);
    tbody.appendChild(tr);

  });

}











// 글쓰기 버튼 클릭 시 모달 보이기
document.querySelector("#boardPagewritePostButton").addEventListener("click", () => {
  $('#boardPagewritePost').modal('show'); // Bootstrap 모달 보이기
});

// 작성 완료 버튼 클릭 시 동작
document.querySelector("#boardPageSubmitButton").addEventListener("click", () => {
  // 여기에 작성 완료 처리를 추가할 수 있습니다.
  // 예를 들어, 입력된 데이터를 가져와서 서버에 전송하는 등의 동작을 수행합니다.
  
  // 모달 닫기
  $('#boardPagewritePost').modal('hide'); // Bootstrap 모달 닫기
});

