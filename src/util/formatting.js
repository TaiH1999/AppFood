// Format current number by using Intl.Numberformat (internaltionalization object) called numberformat
export const currencyFormatter = new Intl.NumberFormat
                    ('EN-US',{
    style: 'currency',
    currency: 'USD', 
                          });
//Format VND currency
// new Intl.NumberFormat
//                     ('vi',{
//     style: 'currency',
//     currency: 'VND', 
//                           });