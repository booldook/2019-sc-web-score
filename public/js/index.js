var html = '';
var site = "https://webmir.co.kr/score";
var scoreURL = {
	cURL: site + "/score_in.php",
	rURL: site + "/score_li.php",
	uURL: site + "/score_up.php",
	dURL: site + "/score_del.php"
}

getList();
function getList() {
	$.ajax({
		type: "get",
		url: scoreURL.rURL,
		data: {
			page: 6
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
		},
		error: function(xhr) {
			alert("통신이 실패했습니다. 관리자에게 문의하세요.");
			console.log(xhr);
		}
	});
}