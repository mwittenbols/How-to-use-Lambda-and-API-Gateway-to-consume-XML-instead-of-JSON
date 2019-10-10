// Let's use the xml2js package to parse our incoming XML to proof we have a proper XML document to work with in Lamda
var xml2js = require('xml2js');

// Some default settings needed by xml2js. We can leave the as they are.
var options = {           // options passed to xml2js parser
  explicitCharkey: false, // undocumented
  trim: false,            // trim the leading/trailing whitespace from text nodes
  normalize: false,       // trim interior whitespace inside text nodes
  explicitRoot: false,    // return the root node in the resulting object?
  emptyTag: null,         // the default value for empty nodes
  explicitArray: true,    // always put child nodes in an array
  ignoreAttrs: false,     // ignore attributes, only create text nodes
  mergeAttrs: false,      // merge attributes and child elements
  validator: null         // a callable validator
};

// Let's change the default handler interface to the following "old" style notation so we have more control with the callback function
exports.handler =  (event, context, callback) => {

    // Let's create an instance of our xml2js parser
    var parser = new xml2js.Parser(options);
    // Retrieve the XML from the JSON body that API Gateway is sending because of this Method Execution VTL: { "body" : $input.json('$') }
    // Note: So, yes, internally API gateway still uses JSON to wrap around our XML to send it to Lambda. But, the JSON is never visibile to the sender of the API request or the consumer of the response.
    var xml = event.body;

    // Let's turn the XML into a Javascript object
    parser.parseString(xml, function (err, result) {

      // If something went wrong, the callback first argument contains the error object that will be sent to API gateway
        if (err!=null) {
           callback(err, null);
        } else {

          // For this example, we are expecting an XML request payload in the form of:
                    
          // <?xml version="1.0"?>
          // <catalog>
          //    <book id="bk101">
          //       <author>Gambardella, Matthew</author>
          //       <title>XML Developer's Guide</title>
          //       <genre>Computer</genre>
          //       <price>44.95</price>
          //       <publish_date>2000-10-01</publish_date>
          //       <description>An in-depth look at creating applications 
          //       with XML.</description>
          //    </book>
          //    <book id="bk102">
          //       <author>Ralls, Kim</author>
          //       <title>Midnight Rain</title>
          //       <genre>Fantasy</genre>
          //       <price>5.95</price>
          //       <publish_date>2000-12-16</publish_date>
          //       <description>A former architect battles corporate zombies, 
          //       an evil sorceress, and her own childhood to become queen 
          //       of the world.</description>
          //    </book>
          //    <book id="bk103">
          //       <author>Corets, Eva</author>
          //       <title>Maeve Ascendant</title>
          //       <genre>Fantasy</genre>
          //       <price>5.95</price>
          //       <publish_date>2000-11-17</publish_date>
          //       <description>After the collapse of a nanotechnology 
          //       society in England, the young survivors lay the 
          //       foundation for a new society.</description>
          //    </book>
          //    <book id="bk104">
          //       <author>Corets, Eva</author>
          //       <title>Oberon's Legacy</title>
          //       <genre>Fantasy</genre>
          //       <price>5.95</price>
          //       <publish_date>2001-03-10</publish_date>
          //       <description>In post-apocalypse England, the mysterious 
          //       agent known only as Oberon helps to create a new life 
          //       for the inhabitants of London. Sequel to Maeve 
          //       Ascendant.</description>
          //    </book>
          //    <book id="bk105">
          //       <author>Corets, Eva</author>
          //       <title>The Sundered Grail</title>
          //       <genre>Fantasy</genre>
          //       <price>5.95</price>
          //       <publish_date>2001-09-10</publish_date>
          //       <description>The two daughters of Maeve, half-sisters, 
          //       battle one another for control of England. Sequel to 
          //       Oberon's Legacy.</description>
          //    </book>
          //    <book id="bk106">
          //       <author>Randall, Cynthia</author>
          //       <title>Lover Birds</title>
          //       <genre>Romance</genre>
          //       <price>4.95</price>
          //       <publish_date>2000-09-02</publish_date>
          //       <description>When Carla meets Paul at an ornithology 
          //       conference, tempers fly as feathers get ruffled.</description>
          //    </book>
          //    <book id="bk107">
          //       <author>Thurman, Paula</author>
          //       <title>Splish Splash</title>
          //       <genre>Romance</genre>
          //       <price>4.95</price>
          //       <publish_date>2000-11-02</publish_date>
          //       <description>A deep sea diver finds true love twenty 
          //       thousand leagues beneath the sea.</description>
          //    </book>
          //    <book id="bk108">
          //       <author>Knorr, Stefan</author>
          //       <title>Creepy Crawlies</title>
          //       <genre>Horror</genre>
          //       <price>4.95</price>
          //       <publish_date>2000-12-06</publish_date>
          //       <description>An anthology of horror stories about roaches,
          //       centipedes, scorpions  and other insects.</description>
          //    </book>
          //    <book id="bk109">
          //       <author>Kress, Peter</author>
          //       <title>Paradox Lost</title>
          //       <genre>Science Fiction</genre>
          //       <price>6.95</price>
          //       <publish_date>2000-11-02</publish_date>
          //       <description>After an inadvertant trip through a Heisenberg
          //       Uncertainty Device, James Salway discovers the problems 
          //       of being quantum.</description>
          //    </book>
          //    <book id="bk110">
          //       <author>O'Brien, Tim</author>
          //       <title>Microsoft .NET: The Programming Bible</title>
          //       <genre>Computer</genre>
          //       <price>36.95</price>
          //       <publish_date>2000-12-09</publish_date>
          //       <description>Microsoft's .NET initiative is explored in 
          //       detail in this deep programmer's reference.</description>
          //    </book>
          //    <book id="bk111">
          //       <author>O'Brien, Tim</author>
          //       <title>MSXML3: A Comprehensive Guide</title>
          //       <genre>Computer</genre>
          //       <price>36.95</price>
          //       <publish_date>2000-12-01</publish_date>
          //       <description>The Microsoft MSXML3 parser is covered in 
          //       detail, with attention to XML DOM interfaces, XSLT processing, 
          //       SAX and more.</description>
          //    </book>
          //    <book id="bk112">
          //       <author>Galos, Mike</author>
          //       <title>Visual Studio 7: A Comprehensive Guide</title>
          //       <genre>Computer</genre>
          //       <price>49.95</price>
          //       <publish_date>2001-04-16</publish_date>
          //       <description>Microsoft Visual Studio 7 is explored in depth,
          //       looking at how Visual Basic, Visual C++, C#, and ASP+ are 
          //       integrated into a comprehensive development 
          //       environment.</description>
          //    </book>
          // </catalog>          
          
          // Now, send a dummy XML string back, but add an XML attribute of the incoming request so we proof that the incoming request was actually parsed as an XML document
          var xmlString = result.Catalog[0];

          // Now prepare the response object
          var resp = {
              // Return this as a successful "200" response
              statusCode: 200,
              headers: {
                  // Note: This Content-Type corresponds to the Content-Type added as Mapping Template in the Integration Response of the API in API Gateway
                  'Content-Type': 'text/xml'
              },
              // Note: This body attribute is what the text/xml Mapping Template of the Integration Response refers to when it executes the following VTL:
              
              // #set($inputRoot = $input.path('$.body'))
              // $inputRoot

              body: xmlString
          }
          
          // Now, call the callback with the response above
          callback(null, resp)
            
        }
    });

};
