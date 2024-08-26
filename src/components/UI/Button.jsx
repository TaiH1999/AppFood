export default function Button({ children, textOnly, className,...props }){
    //Create custome button for feauture use
    let cssClasses = textOnly ? 'text-button' : 'button';
    cssClasses += ' ' + className;
    return( 
    <button  className= {cssClasses} {...props}>
        {children}
    </button>
)};
