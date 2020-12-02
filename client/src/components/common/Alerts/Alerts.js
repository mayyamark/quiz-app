import swal from 'sweetalert';

const showInfoAlert = (title, additionalText, iconType, btnText) => {
  swal({
    title: `${title}`,
    text: `${additionalText}`,
    icon: `${iconType}`,
    button: `${btnText}`,
  });
};

const showConfirmAlert = (title, additionalText, iconType, boolean, historyObject, urlPath) => {
  swal({
    title: `${title}`,
    text: `${additionalText}`,
    icon: `${iconType}`,
    buttons: true,
    dangerMode: boolean,
  })
  .then((confirm) => {
    if (confirm) {
      historyObject.push(urlPath);
    }
  });
};

const showRedirectAlert = (title, additionalText, iconType, historyObject, urlPath) => {
  swal({
    title: `${title}`,
    text: `${additionalText}`,
    icon: `${iconType}`,
  })
  .then((confirm) => {
    if (confirm) {
      historyObject.push(urlPath);
    }
  });
};


export {
  showInfoAlert,
  showConfirmAlert,
  showRedirectAlert,
};