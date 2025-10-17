import Toast from 'react-native-toast-message';

const toastTypes = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
};

export const showToast = (type, message, duration = 3000) => {
  Toast.show({
    type: type,          // success | error | info
    text1: message,  
    visibilityTime: duration,
  });
};


export const ToastMessages = ({
  success: (msg) => showToast(toastTypes.SUCCESS, msg),
  error: (msg) => showToast(toastTypes.ERROR, msg),
  info: (msg) => showToast(toastTypes.INFO, msg),
});
