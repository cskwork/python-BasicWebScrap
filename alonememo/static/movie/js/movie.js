$(document).ajaxStart(function(){
    $('.loader').show(); //ajax실행시 로딩바를 보여준다.
});
$(document).ajaxStop(function(){
    $('.loader').hide(); //ajax종료시 로딩바를 숨겨준다.
});

   function showStar() {
                // 1. #star_box의 내부 html 태그를 모두 삭제합니다.
                $('#star-box').empty()

                // 2. 서버에 1) GET 방식으로, 2) /api/list 라는 주소로 star_list를 요청합니다.
                $.ajax({
                    type: "GET",
                    url: "/api/list",
                    data: {},
                    success: function (response) {
                        // 3. 서버가 돌려준 star_list를 star라는 변수에 저장합니다.
                        let stars = response['stars_list']
                        // 4. for 문을 활용하여 star 배열의 요소를 차례대로 조회합니다.
                        for (let i = 0; i < stars.length; i++) {
                            let star = stars[i]
                            // 5. star[i] 요소의 name, url, img_url, recent, like 키 값을 활용하여 값을 조회합니다.
                            let name = star['name']
                            let url = star['url']
                            let imgUrl = star['img_url']
                            let recentWork = star['recent']
                            let like = star['like']
                            let dislike = star['dislike']

                            // 6. 영화인 카드를 만듭니다.
                            let tempHtml = `<div class="card">
                                <div class="card-content">
                                  <div class="media">
                                    <div class="media-left">
                                      <figure class="image is-50x50">
                                        <img
                                          src="${imgUrl}"
                                          alt="Placeholder image"
                                        />
                                      </figure>
                                    </div>
                                    <div class="media-content">
                                      <a href="${url}" target="_blank" class="star-name title is-4">${name}</a>
                                      <p class="subtitle is-6">${recentWork}</p>
                                    </div>

                                  </div>
                                </div>
                                <footer class="card-footer">
                                  <a href="#" onclick="likeStar('${name}')" class="card-footer-item has-text-info">
                                    좋아요!
                                    <span class="icon">
                                      <i class="fas fa-thumbs-up"></i>
                                    </span>
                                    <p>(${like})</p>
                                  </a>
                                  <a href="#" onclick="disLikeStar('${name}')" class="card-footer-item has-text-info">
                                    싫어요!
                                    <span class="icon">
                                      <i class="fas fa-thumbs-down"></i>
                                    </span>
                                    <p>(${dislike})</p>
                                  </a>
                                  <a href="#" onclick="deleteStar('${name}')" class="card-footer-item has-text-danger">
                                    삭제
                                    <span class="icon">
                                      <i class="fas fa-ban"></i>
                                    </span>
                                  </a>
                                </footer>
                              </div>`

                            // 7. #star-box에 temp_html을 붙입니다.
                            $('#star-box').append(tempHtml)
                        }
                    }
                });
            }

            function likeStar(name) {
                $.ajax({
                    type: "POST",
                    url: "/api/like",
                    data: {'name_give': name},
                    success: function (response) {
                        if (response['result'] == 'success') {
                            // 2. '좋아요 완료!' 얼럿을 띄웁니다.
                            alert('좋아요 완료!')
                            // 3. 변경된 정보를 반영하기 위해 새로고침합니다.
                            window.location.reload()
                        }
                    }
                });
            }

             function disLikeStar(name) {
                $.ajax({
                    type: "POST",
                    url: "/api/dislike",
                    data: {'name_give': name},
                    success: function (response) {
                        if (response['result'] == 'success') {
                            // 2. '좋아요 완료!' 얼럿을 띄웁니다.
                            alert('싫어요 완료!')
                            // 3. 변경된 정보를 반영하기 위해 새로고침합니다.
                            window.location.reload()
                        }
                    }
                });
            }

            function deleteStar(name) {
                // 1. 서버에 1) POST 방식으로, 2) /api/delete 라는 url에, 3) name_give라는 이름으로 name을 전달합니다.
                // 참고) POST 방식이므로 data: {'name_give': name} 과 같은 양식이 되어야합니다!
                $.ajax({
                    type: "POST",
                    url: "/api/delete",
                    data: {'name_give': name},

                    success: function (response) {
                        if (response['result'] == 'success') {
                            // 2. '삭제 완료! 안녕!' 얼럿을 띄웁니다.
                            alert('삭제 완료! 안녕!')
                            // 3. 변경된 정보를 반영하기 위해 새로고침합니다.
                            window.location.reload()
                        }
                    }
                });
            }