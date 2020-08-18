
window.addEventListener("load", () => {
    let title = document.getElementsByTagName("input")[2];
    let text = document.getElementsByTagName("textarea")[0];

    title.placeholder = "Note title";
    text.placeholder = "Note text";

    title.focus();
});


