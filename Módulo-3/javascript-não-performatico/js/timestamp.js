/**
 * Formatação de data/hora
 */
function getFormattedTimeStamp() {
  function leftPad(value, count = 2, char = '0') {
    let leftPad = value;

    if (value.length < count) {
      for (let i = 0; i < count - value.length; i++) {
        leftPad = char + leftPad;
      }
    }

    return leftPad;
  }

  const now = new Date();
  const day = leftPad(now.getDate().toString());
  const month = leftPad((now.getMonth() + 1).toString()); // Mês começa com 0
  const year = now.getFullYear();
  const hour = leftPad(now.getHours().toString());
  const minute = leftPad(now.getMinutes().toString());
  const second = leftPad(now.getSeconds().toString());
  const millisecond = leftPad(now.getMilliseconds().toString(), 3);

  return `${day}/${month}/${year} ${hour}:${minute}:${second}.${millisecond}`;
}
