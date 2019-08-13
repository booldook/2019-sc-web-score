var html = '';
var site = "https://webmir.co.kr/score";
var scoreURL = {
	cURL: site + "/score_in.php",
	rURL: site + "/score_li.php",
	uURL: site + "/score_up.php",
	dURL: site + "/score_del.php"
}

getList(1);
function getList(page) {
	$.ajax({
		type: "get",
		url: scoreURL.rURL,
		data: {
			page: page
		},
		dataType: "json",
		success: function(res) {
			console.log(res);
			for(var i in res.student) {
				html  = '<tr>';
				html += '<td>'+res.student[i].stdname+'</td>';
				html += '<td>'+res.student[i].kor+'점</td>';
				html += '<td>'+res.student[i].eng+'점</td>';
				html += '<td>'+res.student[i].math+'점</td>';
				html += '<td class="text-center">';
				html += '<button class="btn btn-success">수정</button> ';
				html += '<button class="btn btn-danger">삭제</button>';
				html += '</td>';
				html += '</tr>';
				$(".score-tb").find("tbody").append(html);
			}
			pagerMaker(res.total, page);
		},
		error: function(xhr) {
			alert("통신이 실패했습니다. 관리자에게 문의하세요.");
			console.log(xhr);
		}
	});
}

function pagerMaker(total, page) {
	var div = 3;										// 세트당 나올 페이지 수
	var cnt = Math.ceil(total/10);	// 전체 페이지 개수
	var stn = 0;										// 세트중에 시작페이지
	var edn = 0;										// 세트중에 마지막페이지
	var prev = 0;										// < 를 클릭시 나타날 페이지 
	var next = 0;										// > 를 클릭시 나타날 페이지
	var first = 1;
	var last = cnt;
	var lastIndex = (Math.ceil(cnt/div) - 1);			// 페이지 세트의 마지막 index
	var nowIndex = (Math.ceil(page/div) - 1);			// 현재페이지 세트의 index

	stn = nowIndex * div + 1;									// 세트의 시작페이지 값
	if(cnt < stn + div - 1) edn = cnt;
	else edn = stn + div - 1;

	console.log("stn:"+stn);
	console.log("edn:"+edn);
	console.log("lastIndex:"+lastIndex);
	console.log("nowIndex:"+nowIndex);




	html  = '<li class="page-item page-first">';
	html += '<span class="page-link"><i class="fas fa-angle-double-left"></i></span>';
	html += '</li>';
	html += '<li class="page-item page-prev">';
	html += '<span class="page-link"><i class="fas fa-angle-left"></i></span>';
	html += '</li>';
	for(var i=1; i<=cnt; i++) {
		html += '<li class="page-item page-ct">';
		html += '<span class="page-link">'+i+'</span>';
		html += '</li>';
	}
	html += '<li class="page-item page-next">';
	html += '<span class="page-link"><i class="fas fa-angle-right"></i></span>';
	html += '</li>';
	html += '<li class="page-item page-last">';
	html += '<span class="page-link"><i class="fas fa-angle-double-right"></i></span>';
	html += '</li>';
	$(".pager").html(html);
	if(page == 1) $(".page-lt").addClass("disabled");
	if(page == cnt) $(".page-rt").addClass("disabled");
	$(".page-ct").eq(page-1).addClass("active");
}