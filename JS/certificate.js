const secret = btoa(navigator.userAgent);
console.log(secret);
// const [txnId, setTxnId] = useState("");
// const [token, setToken] = useState("");
// const [loading, setLoading] = useState(false);
// const [err, setErr] = useState(false);
// const [errText, setErrText] = useState("");

var flag = false;

var txn;

async function getOTP() {
  var mobNum = document.getElementById("phonenumber").value;
  console.log(mobNum);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    mobile: "" + mobNum + "",
    secret: "" + secret + "",
  });

  console.log(raw);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => (txn = JSON.parse(result)))
    .catch((error) => console.log("error", error));

    var x = document.getElementById("getOTP");
    x.style.display = "none";
    var y = document.getElementById("verifyOTP");
    y.style.display = "block";
    
}

// console.log(txn);

var token;

function verifyOTP() {
  var otp = document.getElementById("otp").value;
  const hashedOtp = sha256("" + otp + "");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    otp: "" + hashedOtp + "",
    txnId: "" + txn.txnId + "",
  });

  console.log(raw);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => (token = JSON.parse(result)))
    .catch((error) => console.log("error", error));
}

// function download() {
// let fnGetFileNameFromContentDispostionHeader = function (header) {
// 		let contentDispostion = header.split(';');
// 		const fileNameToken = `filename*=UTF-8''`;
	
// 		let fileName = 'downloaded.pdf';
// 		for (let thisValue of contentDispostion) {
// 			if (thisValue.trim().indexOf(fileNameToken) === 0) {
// 				fileName = decodeURIComponent(thisValue.trim().replace(fileNameToken, ''));
// 				break;
// 			}
// 		}
	
// 		return fileName;
// 	};
//   var beneficiary = document.getElementById("beneficary").value;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", "Bearer " + token.token + "");

//   console.log(myHeaders);

//   var requestOptions = {
//     method: "GET",
//     headers: myHeaders,
//     redirect: "follow",
//   };

//   fetch(
//     "https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id=" +
//       beneficiary,
//     requestOptions
//   )
//     .then(res=> {
// 		res.text();
// 	})
//     .then(blob => {
// 		var url = window.URL.createObjectURL(blob);
// 		var a = document.createElement('a');
// 		a.href = url;
// 		a.download = "filename.pdf";
// 		document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
// 		a.click();    
// 		a.remove();
//     })
//     .catch((error) => console.log("error", error));
// }

var pdfData;

function download() {
  
    var beneficiary = document.getElementById("beneficary").value;
  
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token.token+"");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id="+beneficiary, requestOptions)
      .then(response => response.text())
      .then(result => pdfData = result)
      .catch(error => console.log('error', error));

      window.open("data:application/pdf," + encodeURI(pdfData));
      
      var insertData = document.getElementById('pdfData');
      var data = "<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(pdfData) + "'></iframe>";
      insertData.innerHTML=data;
      // window.open("data:application/octet-stream;charset=utf-16le;base64,"+pdfData);

      // var byteCharacters = btoa(pdfData);
      // var byteNumbers = new Array(byteCharacters.length);
      // for (var i = 0; i < byteCharacters.length; i++) {
      //     byteNumbers[i] = byteCharacters.charCodeAt(i);
      // }
      // var byteArray = new Uint8Array(byteNumbers);
      // var blob = new Blob([byteArray], { type: "application/pdf" });
      // FileSaver.saveAs(blob, "invoice.pdf");
      
  }

  

function pdfTesting(){
  var bin = atob(pdfData);
  console.log('File Size:', Math.round(bin.length / 1024), 'KB');
  console.log('PDF Version:', bin.match(/^.PDF-([0-9.]+)/)[1]);
  console.log('Create Date:', bin.match(/<xmp:CreateDate>(.+?)<\/xmp:CreateDate>/)[1]);
  console.log('Modify Date:', bin.match(/<xmp:ModifyDate>(.+?)<\/xmp:ModifyDate>/)[1]);
  console.log('Creator Tool:', bin.match(/<xmp:CreatorTool>(.+?)<\/xmp:CreatorTool>/)[1]);
}




function sha256(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }

  var mathPow = Math.pow;
  var maxWord = mathPow(2, 32);
  var lengthProperty = "length";
  var i, j; // Used as a counter across the whole file
  var result = "";

  var words = [];
  var asciiBitLength = ascii[lengthProperty] * 8;

  //* caching results is optional - remove/add slash from front of this line to toggle
  // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
  // (we actually calculate the first 64, but extra values are just ignored)
  var hash = (sha256.h = sha256.h || []);
  // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
  var k = (sha256.k = sha256.k || []);
  var primeCounter = k[lengthProperty];
  /*/
	var hash = [], k = [];
	var primeCounter = 0;
	//*/

  var isComposite = {};
  for (var candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  ascii += "\x80"; // Append Ƈ' bit (plus zero padding)
  while ((ascii[lengthProperty] % 64) - 56) ascii += "\x00"; // More zero padding
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return; // ASCII check: only accept characters in range 0-255
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
  words[words[lengthProperty]] = asciiBitLength;

  // process each chunk
  for (j = 0; j < words[lengthProperty]; ) {
    var w = words.slice(j, (j += 16)); // The message is expanded into 64 words as part of the iteration
    var oldHash = hash;
    // This is now the undefinedworking hash", often labelled as variables a...g
    // (we have to truncate as well, otherwise extra entries at the end accumulate
    hash = hash.slice(0, 8);

    for (i = 0; i < 64; i++) {
      var i2 = i + j;
      // Expand the message into 64 words
      // Used below if
      var w15 = w[i - 15],
        w2 = w[i - 2];

      // Iterate
      var a = hash[0],
        e = hash[4];
      var temp1 =
        hash[7] +
        (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) + // S1
        ((e & hash[5]) ^ (~e & hash[6])) + // ch
        k[i] +
        // Expand the message schedule if needed
        (w[i] =
          i < 16
            ? w[i]
            : (w[i - 16] +
                (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) + // s0
                w[i - 7] +
                (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) | // s1
              0);
      // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
      var temp2 =
        (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) + // S0
        ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2])); // maj

      hash = [(temp1 + temp2) | 0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
      hash[4] = (hash[4] + temp1) | 0;
    }

    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }

  for (i = 0; i < 8; i++) {
    for (j = 3; j + 1; j--) {
      var b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? 0 : "") + b.toString(16);
    }
  }
  return result;
}