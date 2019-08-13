// 삼항연산자
// 조건?참일때:거짓일때
console.log(3 > 5 ? "참" : "거짓");

// data-set
$("#bt-data-test").click(function () {
	var id = $(this).data("id");
	var show = $(this).data("show-text");
	var hide = $(this).data("hide-text");
	console.log(id, show, hide);
});


var html = '';
var site = "https://webmir.co.kr/score";
var scoreURL = {
	cURL: site + "/score_in.php",
	rURL: site + "/score_li.php",
	uURL: site + "/score_up.php",
	dURL: site + "/score_del.php"
}
var nowPage = 1;

getList(nowPage);
// 리스트 가져오기 
// get / https://webmir.co.kr/score/score_li.php / page
function getList(page) {
	nowPage = page;		//지역변수 page의 값을 전역변수 nowPage에 넣어준다.
	$.ajax({
		type: "get",
		url: scoreURL.rURL,
		data: {
			page: page
		},
		dataType: "json",
		success: function (res) {
			console.log(res);
			$(".score-tb").find("tbody").empty();
			for (var i in res.student) {
				html = '<tr>';
				html += '<td>' + res.student[i].stdname + '</td>';
				html += '<td>' + res.student[i].kor + '점</td>';
				html += '<td>' + res.student[i].eng + '점</td>';
				html += '<td>' + res.student[i].math + '점</td>';
				html += '<td class="text-center">';
				html += '<button class="btn btn-success bt-up" data-id="' + res.student[i].id + '">수정</button> ';
				html += '<button class="btn btn-danger bt-del" data-id="' + res.student[i].id + '">삭제</button>';
				html += '</td>';
				html += '</tr>';
				$(".score-tb").find("tbody").append(html);
			}
			pagerMaker(res.total, page);
			deleteMaker();
		},
		error: function (xhr) {
			alert("통신이 실패했습니다. 관리자에게 문의하세요.");
			console.log(xhr);
		}
	});
}


// 페이저 생성
function pagerMaker(total, page) {
	var div = 3; // 세트당 나올 페이지 수
	var cnt = Math.ceil(total / 10); // 전체 페이지 개수
	var stn = 0; // 세트중에 시작페이지
	var edn = 0; // 세트중에 마지막페이지
	var prev = 0; // < 를 클릭시 나타날 페이지 
	var next = 0; // > 를 클릭시 나타날 페이지
	var prevShow = false;
	var lastShow = false;
	var lastIndex = (Math.ceil(cnt / div) - 1); // 페이지 세트의 마지막 index
	var nowIndex = (Math.ceil(page / div) - 1); // 현재페이지 세트의 index

	stn = nowIndex * div + 1; // 세트의 시작페이지 값
	if (cnt < stn + div - 1) edn = cnt;
	else edn = stn + div - 1;

	if (nowIndex > 0) {
		prevShow = true;
		prev = stn - 1;
	}

	if (lastIndex > nowIndex) {
		lastShow = true;
		next = edn + 1;
	}

	console.log("stn:" + stn);
	console.log("edn:" + edn);
	console.log("lastIndex:" + lastIndex);
	console.log("nowIndex:" + nowIndex);

	html = '<li class="page-item page-first ' + (prevShow ? "" : "disabled") + '" data-page="' + prev + '">';
	html += '<span class="page-link"><i class="fas fa-angle-double-left"></i></span>';
	html += '</li>';
	html += '<li class="page-item page-prev ' + ((page > 1) ? "" : "disabled") + '" data-page="' + ((page > 1) ? (page - 1) : 0) + '">';
	html += '<span class="page-link"><i class="fas fa-angle-left"></i></span>';
	html += '</li>';
	for (var i = stn; i <= edn; i++) {
		html += '<li class="page-item page-ct ' + (page == i ? "active" : "") + '" data-page="' + i + '">';
		html += '<span class="page-link">' + i + '</span>';
		html += '</li>';
	}
	html += '<li class="page-item page-next ' + (page < cnt ? "" : "disabled") + '" data-page="' + ((page < cnt) ? (page + 1) : 0) + '">';
	html += '<span class="page-link"><i class="fas fa-angle-right"></i></span>';
	html += '</li>';
	html += '<li class="page-item page-last ' + (lastShow ? "" : "disabled") + '" data-page="' + next + '">';
	html += '<span class="page-link"><i class="fas fa-angle-double-right"></i></span>';
	html += '</li>';
	$(".pager").html(html);
	$(".page-item").click(function () {
		if (!$(this).hasClass("disabled")) getList($(this).data("page"));
	});
}
console.log(!false);


// 리스트 삭제하기 
function deleteMaker() {
	// post / https://webmir.co.kr/score/score_del.php / id
	$(".bt-del").click(function () {
		if(confirm("정말로 삭제하시겠습니까?")) {
			$.ajax({
				type: "post",
				url: scoreURL.dURL,
				data: {id: $(this).data("id")},
				dataType: "json",
				success: function (res) {
					if (res.code == 200) getList(nowPage);
					else alert("데이터 처리가 실패했습니다. 관리자에게 문의하세요.");
				}
			});
		}
	});
}