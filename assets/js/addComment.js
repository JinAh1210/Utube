import axios from "axios";

const addCommentForm = document.getElementById("jsAddcomment");
const commentList = document.getElementById("jsCommentList");
const commnetNumber = document.getElementById("jsCommetNumber");

const increaseNumber = () => {
    commnetNumber.innerHTML = parseInt(commnetNumber.innerHTML, 10) + 1;
};

const addComment = (comment) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerHTML = comment;
    li.appendChild(span);
    commentList.prepend(li);
    increaseNumber();
};

const sendComment = async comment => {
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url:`/api/${videoId}/comment`,
        method:"POST",
        data: {
            comment // comment : comment , videoController.js의 postAddComment()의 comment라는 body에 들어감.
        }
    });
    if(response.status === 200){
        addComment(comment);
    }
};

const handleSubmit = event => {
    event.preventDefault();
    const commentInput = addCommentForm.querySelector("input");
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = "";
};


function init(){
    addCommentForm.addEventListener("submit", handleSubmit);
};

if(addCommentForm){
    init();
};