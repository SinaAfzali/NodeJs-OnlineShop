
class Request{
    static async Post(url, obj) {
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
          };
        
          try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('خطا در ارسال درخواست:', error);
            return null; // یا مقدار پیشفرض دیگری که مد نظر شماست
        }
    }
} 

module.exports = Request;