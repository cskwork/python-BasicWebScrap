//멀티 포스팅 방지 , 20201106, by cskuk
var posted=false;

            function openClose() {
                // id 값 post-box의 display 값이 block 이면(= 눈에 보이면)
                if ($("#post-box").css("display") == "block") {
                    // post-box를 가리고
                    $("#post-box").hide();
                    // 다시 버튼을 클릭하면, 박스 열기를 할 수 있게 텍스트 바꿔두기
                    $("#btn-post-box").text("포스팅 박스 열기");
                } else {
                    // 아니면(눈에 보이지 않으면) post-box를 펴라
                    $("#post-box").show();
                    // 다시 버튼을 클릭하면, 박스 닫기를 할 수 있게 텍스트 바꿔두기
                    $("#btn-post-box").text("포스팅 박스 닫기");
                }
            }

            function postArticle() {
                //멀티 포스팅 방지 , 20201106, by cskuk
                if(posted) return;
                posted=true;

                let url = $("#post-url").val();
                let comment = $("#post-comment").val();
                if(url == ''){
                    alert('입력된 URL이 없습니다');
                    return;
                }

                // 2. memo에 POST 방식으로 메모 생성 요청하기
                $.ajax({
                    type: "POST", // POST 방식으로 요청하겠다.
                    url: "/insertOneMemo", // /memo라는 url에 요청하겠다.
                    data: {url_give: url, comment_give: comment}, // 데이터를 주는 방법
                    error : function(error){
                        alert('오류가 발생했습니다. 관리자에게 문의해주세요.');
                        console.log(error);
                        window.location.reload();
                    },
                    success: function (response) { // 성공하면
                        if (response["result"] == "success") {
                            alert("포스팅 성공!");
                            posted=false;//멀티 포스팅 방지 , 20201106, by cskuk
                            // 3. 성공 시 페이지 새로고침하기
                            window.location.reload();
                        } else {
                            alert("서버 오류!")
                        }
                    }
                });

            }

            function showArticles() {
                $.ajax({
                    type: "GET",
                    url: "/listAllMemo",
                    data: {},
                    error : function(error){
                        alert('오류가 발생했습니다. 관리자에게 문의해주세요.');
                        console.log(error);
                        window.location.reload();
                    },
                    success: function (response) {
                        let articles = response["articles"];
                        console.log(articles);
                        for (let i = 0; i < articles.length; i++) {
                            makeCard(articles[i]["image"], articles[i]["url"], articles[i]["title"], articles[i]["desc"], articles[i]["comment"]);
                        }
                    }
                })
            }

            function makeCard(image, url, title, desc, comment) {
                let tempHtml = `<div class="card">
                        <img class="card-img-top" src="${image}" alt="Card image cap">
                        <div class="card-body">
                        <a href="${url}" target="_blank" class="card-title">${title}</a>
                        <p class="card-text">${desc}</p>
                        <p class="card-text comment">${comment}</p>
                        <button class="btn btn-outline-info">수정</button>
                        <button onclick="delMemo('${url}')" class="btn btn-outline-danger">삭제</button>
                        </div>
                    </div>`;
                $("#cards-box").append(tempHtml);
            }

           function delMemo(url){
                $.ajax({
                    type: "POST",
                    url: "/delOneMemo",
                    data: {del_url : url},
                    error : function(error){
                        alert('오류가 발생했습니다. 관리자에게 문의해주세요.');
                        console.log(error);
                        window.location.reload();
                    },
                    success: function (response) {
                        window.location.reload()
                    }
                })
            }