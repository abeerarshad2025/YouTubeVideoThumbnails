/*
 * fetchVideoTitle()
 */

function fetchVideoTitle(videoID) {
  var url = "https://www.youtube.com/watch?v=" + videoID;
  url = encodeURIComponent(url);
  var videoTitle = "";

  $.ajax({
    url: 'https://youtube.com/oembed?url=' + url + '&format=json',
    async: false,
    dataType: 'json',
    success: function(result) {
      videoTitle = result.title;
    }
  });
  return videoTitle;
}

/*
 * fetchThumbnails()
 */

function fetchThumbnails() {
  var videoID = document.getElementById("videoURLTxt").value;
  var thumbnailTypes = ["default", "mqdefault", "sddefault", "hqdefault", "hq720", "hq720_1", "hq720_2",
    "hq720_3", "maxresdefault", "maxres1", "maxres2", "maxres3", "oardefault", "oar1", "oar2", "oar3",
    "0", "1", "2", "3"];

  var videoThumbnails = document.createElement("div");
  videoThumbnails.className = "videoThumbnails";

  for (var i = 0; i < thumbnailTypes.length; i++) {
    var thumbnailImageUrl = "https://i.ytimg.com/vi/" + videoID + "/" + thumbnailTypes[i] + ".jpg";

    var thumbnailLink = document.createElement("a");
    thumbnailLink.href = thumbnailImageUrl;
    thumbnailLink.innerHTML = thumbnailTypes[i];
    thumbnailLink.target="_blank";

    var thumbnailPreview = document.createElement("img");
    thumbnailPreview.src = thumbnailImageUrl;
    thumbnailPreview.width = 100;

    var thumbnailLinkAndImage = document.createElement("div");
    thumbnailLinkAndImage.className = "thumbnailLinkAndImage";
    thumbnailLink.appendChild(thumbnailPreview);
    thumbnailLinkAndImage.appendChild(thumbnailLink);
    videoThumbnails.appendChild(thumbnailLinkAndImage);
  }

  var videoTitle = document.createElement("p");
  videoTitle.className = "videoTitle";
  videoTitle.innerHTML = fetchVideoTitle(videoID);

  var videoInfo = document.createElement("div");
  videoInfo.className = "videoInfo";
  videoInfo.appendChild(videoTitle);
  videoInfo.appendChild(videoThumbnails);

  document.getElementById("thumbnailsList").prepend(videoInfo);
}
