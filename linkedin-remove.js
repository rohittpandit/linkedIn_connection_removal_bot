const puppeteer = require("puppeteer");
const fs = require("fs");

// ✅ Add your LinkedIn profile links here
const profileLinks = [
 "https://www.linkedin.com/in/zishan-ahmad-karim-10270024a", 
 "https://www.linkedin.com/in/rishikesh-singh-970884316", 
 "https://www.linkedin.com/in/krishna-kanhaiya-a9a3828", 
 "https://www.linkedin.com/in/chaitanya-tandon-29273220b", 
 "https://www.linkedin.com/in/caneerajdwivedi", 
 "https://www.linkedin.com/in/divya-devraj-088217218", 
 "https://www.linkedin.com/in/anna-nguyen-028236233", 
 "https://www.linkedin.com/in/mayankarya", 
 "https://www.linkedin.com/in/ambaprasadgudipati", 
 "https://www.linkedin.com/in/mrahulkothari", 
 "https://www.linkedin.com/in/chandra-annam", 
 "https://www.linkedin.com/in/santoshkudva", 
 "https://www.linkedin.com/in/nem-singh-6a3935a0", 
 "https://www.linkedin.com/in/kunalkakkar", 
 "https://www.linkedin.com/in/rohit-rawat17", 
 "https://www.linkedin.com/in/imran-kazi-73540314b", 
 "https://www.linkedin.com/in/manojkumar72", 
 "https://www.linkedin.com/in/priyanka-taneja-pt26", 
 "https://www.linkedin.com/in/suryadeepti", 
 "https://www.linkedin.com/in/davra-priyanshi", 
 "https://www.linkedin.com/in/reet-r-49965619a", 
 "https://www.linkedin.com/in/uday-arora", 
 "https://www.linkedin.com/in/farhan007000", 
 "https://www.linkedin.com/in/ever-loyal", 
 "https://www.linkedin.com/in/aravindhegde", 
 "https://www.linkedin.com/in/divyarakesh", 
 "https://www.linkedin.com/in/bharathkumarai", 
 "https://www.linkedin.com/in/anilkumartm", 
 "https://www.linkedin.com/in/harshit-jain-b932a213a", 
 "https://www.linkedin.com/in/hanasim", 
 "https://www.linkedin.com/in/nsanghi", 
 "https://www.linkedin.com/in/sachinkumark", 
 "https://www.linkedin.com/in/kiranpassumarthi", 
 "https://www.linkedin.com/in/anurag-sharma-90885a153", 
 "https://www.linkedin.com/in/khaja-c-333077104", 
 "https://www.linkedin.com/in/tushar-gupta-1793731bb", 
 "https://www.linkedin.com/in/mukeshreddyv", 
 "https://www.linkedin.com/in/harimylaraiah", 
 "https://www.linkedin.com/in/lalit-n-98710112b", 
 "https://www.linkedin.com/in/prajwal-dubey", 
 "https://www.linkedin.com/in/gunjan-kumari-9a04321b1", 
 "https://www.linkedin.com/in/diksha-asija", 
 "https://www.linkedin.com/in/ankeet-k-814602197", 
 "https://www.linkedin.com/in/yash-modii", 
 "https://www.linkedin.com/in/sudharsan-k-3b6137155", 
 "https://www.linkedin.com/in/shebanaim", 
 "https://www.linkedin.com/in/amit-k-nayak", 
 "https://www.linkedin.com/in/jitendra-bothra-a1073920", 
 "https://www.linkedin.com/in/medhavi-pokhriyal", 
 "https://www.linkedin.com/in/ankur-virmani-76499699", 
 "https://www.linkedin.com/in/puneet-verma-bb0a43175", 
 "https://www.linkedin.com/in/sujitjohnjacob", 
 "https://www.linkedin.com/in/aaroohi-dudeja", 
 "https://www.linkedin.com/in/hemant-verma-boston", 
 "https://www.linkedin.com/in/shakeel-1b6847125", 
 "https://www.linkedin.com/in/bhavin-vadodariya", 
 "https://www.linkedin.com/in/varsha-puthran-shedge-842b2089", 
 "https://www.linkedin.com/in/asmeen-shariff-9018a3190", 
 "https://www.linkedin.com/in/mohinderpatravali", 
 "https://www.linkedin.com/in/ramjitiwari1", 
 "https://www.linkedin.com/in/umed-kejariwal-1905672", 
 "https://www.linkedin.com/in/pawan-yadav-854b12172", 
 "https://www.linkedin.com/in/pankajarya11", 
 "https://www.linkedin.com/in/nima-kashyap-a1352750", 
 "https://www.linkedin.com/in/akasharyz", 
 "https://www.linkedin.com/in/pushpendra-singh-a11915129", 
 "https://www.linkedin.com/in/akhil-kataria", 
 "https://www.linkedin.com/in/abhaygarg259", 
 "https://www.linkedin.com/in/atindramishra", 
 "https://www.linkedin.com/in/piyush-v-agarwal", 
 "https://www.linkedin.com/in/yogeshgauryt", 
 "https://www.linkedin.com/in/itsdimai", 
 "https://www.linkedin.com/in/tomap-gaurav", 
 "https://www.linkedin.com/in/sumit-gupta-869210150", 
 "https://www.linkedin.com/in/tusharkjha", 
 "https://www.linkedin.com/in/ajay-saini-b2771a102", 
 "https://www.linkedin.com/in/subhash-chandra-rmg", 
 "https://www.linkedin.com/in/nikhil-kumar-singh-3255002b", 
 "https://www.linkedin.com/in/shaleen-gupta-ds4372", 
 "https://www.linkedin.com/in/gnaneshwar-vanam", 
 "https://www.linkedin.com/in/chhaya-t-69b02853", 
 "https://www.linkedin.com/in/amarpreet-singh-504008114", 
 "https://www.linkedin.com/in/yasser-siddiqui-b298a98b", 
 "https://www.linkedin.com/in/ayush-sriv-0919", 
 "https://www.linkedin.com/in/abhaygadiya", 
 "https://www.linkedin.com/in/risavsingh-saingar", 
 "https://www.linkedin.com/in/roshan-khatri-185b7375", 
 "https://www.linkedin.com/in/techwithshadab", 
 "https://www.linkedin.com/in/shan1980", 
 "https://www.linkedin.com/in/suzan-almeida-a14baa23", 
 "https://www.linkedin.com/in/swaminathan-m-68539140", 
 "https://www.linkedin.com/in/barath-kaveripakam-b4311044", 
 "https://www.linkedin.com/in/anurag-mudgal", 
 "https://www.linkedin.com/in/nitinsrivastava", 
 "https://www.linkedin.com/in/jithin-india", 
 "https://www.linkedin.com/in/neeraj-mathur1", 
 "https://www.linkedin.com/in/pooja-sharma-a31b4123", 
 "https://www.linkedin.com/in/ritesh-rathod-b9633313", 
 "https://www.linkedin.com/in/pncsatna", 
 "https://www.linkedin.com/in/janardhanreddych", 
 "https://www.linkedin.com/in/ankur-pal", 
 "https://www.linkedin.com/in/narayananandkulkarni", 
 "https://www.linkedin.com/in/saurovghosh", 
 "https://www.linkedin.com/in/prasanna-n-41046a4", 
 "https://www.linkedin.com/in/sachinjchorge", 
 "https://www.linkedin.com/in/sonia-bhatia-45297473", 
 "https://www.linkedin.com/in/vivek-pawar", 
 "https://www.linkedin.com/in/gopinath-anandan-12578636", 
 "https://www.linkedin.com/in/vinay-manish-168710", 
 "https://www.linkedin.com/in/dheerajlamkhade", 
 "https://www.linkedin.com/in/rajivdinesh", 
 "https://www.linkedin.com/in/vitalypartners", 
 "https://www.linkedin.com/in/yarivlotan", 
 "https://www.linkedin.com/in/gracechenmba", 
 "https://www.linkedin.com/in/ratnakarpandey", 
 "https://www.linkedin.com/in/adityaagarwalbitspilani", 
 "https://www.linkedin.com/in/tanmayee-waghmare", 
 "https://www.linkedin.com/in/neel-bhende", 
 "https://www.linkedin.com/in/raj--shah", 
 "https://www.linkedin.com/in/vibhormittal2005", 
 "https://www.linkedin.com/in/sudarshanc", 
 "https://www.linkedin.com/in/zahir-sayed-88167514", 
 "https://www.linkedin.com/in/mohd-younus-ansari-54518725", 
 "https://www.linkedin.com/in/lokeshwarri-sk-12992919", 
 "https://www.linkedin.com/in/lilykatz", 
 "https://www.linkedin.com/in/knbhat", 
 "https://www.linkedin.com/in/zahirshaikh101", 
 "https://www.linkedin.com/in/manishprofile", 
 "https://www.linkedin.com/in/nirmal-shah-39722216", 
 "https://www.linkedin.com/in/siddharth-ramaswamy-8283201b", 
 "https://www.linkedin.com/in/devalnaik", 
 "https://www.linkedin.com/in/abhishekguharoy", 
 "https://www.linkedin.com/in/srinisatya", 
 "https://www.linkedin.com/in/harshsingal", 
 "https://www.linkedin.com/in/lijojohnrbs", 
 "https://www.linkedin.com/in/bimal-desai-42a696a", 
 "https://www.linkedin.com/in/rajkgrover", 
 "https://www.linkedin.com/in/rajeshbommaan", 
 "https://www.linkedin.com/in/madhavdutta", 
 "https://www.linkedin.com/in/siddhant-s-a518a338", 
 "https://www.linkedin.com/in/hardik-rshah", 
 "https://www.linkedin.com/in/kinjal-narang-2aa387232", 
 "https://www.linkedin.com/in/anjali-gupta-382257181", 
 "https://www.linkedin.com/in/erabhaysinghthakur", 
 "https://www.linkedin.com/in/kaushik-vasnani-7298b2191", 
 "https://www.linkedin.com/in/chintu-sarodia-3075a2158", 
 "https://www.linkedin.com/in/diwakar-mohan-59b02325", 
 "https://www.linkedin.com/in/digitalmarketeramitkumar", 
 "https://www.linkedin.com/in/manish-kumar-jha-49315316", 
 "https://www.linkedin.com/in/ajeesh-sahadevan", 
 "https://www.linkedin.com/in/nilay-shrivastav", 
 "https://www.linkedin.com/in/pranav-dawer-752429a9", 
 "https://www.linkedin.com/in/ajay-savani-352a4680", 
 "https://www.linkedin.com/in/trishnatechmagnate", 
 "https://www.linkedin.com/in/jyoti-pandey-6a342b240", 
 "https://www.linkedin.com/in/kristina-ayrapetyan", 
 "https://www.linkedin.com/in/debodyuti-bhattacharya-17442670", 
 "https://www.linkedin.com/in/aditi-sambyal-18a2b2250", 
 "https://www.linkedin.com/in/eiti-singhal", 
 "https://www.linkedin.com/in/ajay-talwar-5a53515b", 
 "https://www.linkedin.com/in/manisha-desai-61a63b105", 
 "https://www.linkedin.com/in/ajinkyapatil11", 
 "https://www.linkedin.com/in/vikash-mishra-10july", 
 "https://www.linkedin.com/in/renyesha-wadhwa-lead-generation-expert", 
 "https://www.linkedin.com/in/arvindsinghshekhawat", 
 "https://www.linkedin.com/in/moneysaini", 
 "https://www.linkedin.com/in/manisha-gupta-7ba7b544", 
 "https://www.linkedin.com/in/ujjwalnigam2128", 
 "https://www.linkedin.com/in/joydeep-mukherjee-xlri", 
 "https://www.linkedin.com/in/rahul-mehra-leader", 
 "https://www.linkedin.com/in/ajeetsinghh", 
 "https://www.linkedin.com/in/digital001", 
 "https://www.linkedin.com/in/sourav-dhaniya-462934202", 
 "https://www.linkedin.com/in/devendra-kushwaha44", 
 "https://www.linkedin.com/in/hamza-azhar-16691416a", 
 "https://www.linkedin.com/in/jyoti-verma-0248021b2", 
 "https://www.linkedin.com/in/rahul-mehta-1b412754", 
 "https://www.linkedin.com/in/neel-vaghasiya", 
 "https://www.linkedin.com/in/anubhav-tiwari01", 
 "https://www.linkedin.com/in/aslamkhan123", 
 "https://www.linkedin.com/in/sachintyagii", 
 "https://www.linkedin.com/in/ankita-sri18", 
 "https://www.linkedin.com/in/sanjayseoconsultantnoida", 
 "https://www.linkedin.com/in/ismailtoppo", 
 "https://www.linkedin.com/in/dhruve-taneja-28387180", 
 "https://www.linkedin.com/in/santosh-chowdhary-68a605159", 
 "https://www.linkedin.com/in/hemantwarier", 
 "https://www.linkedin.com/in/abdul-alique", 
 "https://www.linkedin.com/in/shikha-choudhary-b5894a18", 
 "https://www.linkedin.com/in/bhawna-rawat-9b0423133", 
 "https://www.linkedin.com/in/amitjaiswal-maritime-ai-business-strategy", 
 "https://www.linkedin.com/in/zubin-narielwala-10687289", 
 "https://www.linkedin.com/in/raghav-seth-40351993", 
 "https://www.linkedin.com/in/mansi-gupta-437529194", 
 "https://www.linkedin.com/in/prabhat-shukla-90143118", 
 "https://www.linkedin.com/in/tanmay-jain-648b1497", 
 "https://www.linkedin.com/in/rsrohitsinghal", 
 "https://www.linkedin.com/in/henu-sharma-574452111", 
 "https://www.linkedin.com/in/rohit-rajpal-b0573516", 
 "https://www.linkedin.com/in/shiv-dial-sud-and-sons-71a551208", 
 "https://www.linkedin.com/in/anurag-khare-260a65111", 
 "https://www.linkedin.com/in/faouz-rejeb-11a5b8185", 
 "https://www.linkedin.com/in/vaibhav-pratap-53121a205", 
 "https://www.linkedin.com/in/stan-zhang-225181179", 
 "https://www.linkedin.com/in/ishika-bafna-0573b6217", 
 "https://www.linkedin.com/in/pankaj-kumar-8b030a198", 
 "https://www.linkedin.com/in/abhinav-narayan-40a943128", 
 "https://www.linkedin.com/in/dhruvimalaviya", 
 "https://www.linkedin.com/in/valerie-ye-6a187ba1", 
 "https://www.linkedin.com/in/ankita-aggarwal", 
 "https://www.linkedin.com/in/vivek-gupte-06a99713", 
 "https://www.linkedin.com/in/abhishek791987", 
 "https://www.linkedin.com/in/adikapadia", 
 "https://www.linkedin.com/in/sonamkhurana", 
 "https://www.linkedin.com/in/shivanidesai-", 
 "https://www.linkedin.com/in/kushnaman", 
 "https://www.linkedin.com/in/iamlevinferrao", 
 "https://www.linkedin.com/in/abhijeettamboli", 
 "https://www.linkedin.com/in/keshukeshvala", 
 "https://www.linkedin.com/in/seema-kumari-85ba6a1b2", 
 "https://www.linkedin.com/in/jeffglazer", 
 "https://www.linkedin.com/in/ebrahim-argha-3355211a4", 
 "https://www.linkedin.com/in/rinku-kumari-9737b6119", 
 "https://www.linkedin.com/in/madhu-pal-a026671b4", 
 "https://www.linkedin.com/in/shivani-rajput-6b5037199", 
 "https://www.linkedin.com/in/soumya-naikar-3240071b6", 
 "https://www.linkedin.com/in/isha-k-k", 
 "https://www.linkedin.com/in/faiz-saneen-a854aa19b", 
 "https://www.linkedin.com/in/kanchan-pal-718a021b8", 
 "https://www.linkedin.com/in/covi-check-1662b71b6", 
 "https://www.linkedin.com/in/bharat-raghav-3b0b8467", 
 "https://www.linkedin.com/in/nipun-kaushal-4818039", 
 "https://www.linkedin.com/in/shakir-khan-398648193", 
 "https://www.linkedin.com/in/nakshi-shah-60b4591b4", 
 "https://www.linkedin.com/in/ayush-poddar-62b7b35b", 
 "https://www.linkedin.com/in/kanhaiyaupadhyay", 
 "https://www.linkedin.com/in/dr-urvi-parmar", 
 "https://www.linkedin.com/in/heyriteshsharma", 
 "https://www.linkedin.com/in/praveen-danial-1b945b18a", 
 "https://www.linkedin.com/in/angela-tang-%E2%86%92-face-mask-machine-6b7a821a5", 
 "https://www.linkedin.com/in/soniaspecialist", 
 "https://www.linkedin.com/in/ankita-chatterjee-b9a678198", 
 "https://www.linkedin.com/in/kajal-jain-6348a916a", 
 "https://www.linkedin.com/in/i-m-rahul-singh", 
 "https://www.linkedin.com/in/jasleen-kour-04913318a", 
 "https://www.linkedin.com/in/samkirubaharan", 
 "https://www.linkedin.com/in/vinod-shankar-6482a029", 
 "https://www.linkedin.com/in/manishjaglan99", 
 "https://www.linkedin.com/in/jaspreet-singh---", 
 "https://www.linkedin.com/in/prasanth-r-4583274a", 
 "https://www.linkedin.com/in/himsagarpareta", 
 "https://www.linkedin.com/in/sayantan-das-marketing-specialist", 
 "https://www.linkedin.com/in/adarshsuresh", 
 "https://www.linkedin.com/in/obaid-hussain-86a55767", 
 "https://www.linkedin.com/in/mehul-d-69871b13", 
 "https://www.linkedin.com/in/web-digital-marketing-expert-amit-maheshwari", 
 "https://www.linkedin.com/in/industrialist", 
 "https://www.linkedin.com/in/punit-digital-marketing-expert", 
 "https://www.linkedin.com/in/utkarshsingh-jj", 
 "https://www.linkedin.com/in/shajeeuddin", 
 "https://www.linkedin.com/in/dhruven-ponkiya-4b8425162", 
 "https://www.linkedin.com/in/aravindmahalakshmi", 
 "https://www.linkedin.com/in/kumaramit7", 
 "https://www.linkedin.com/in/mandeep-tamang", 
 "https://www.linkedin.com/in/yoshodhara-das", 
 "https://www.linkedin.com/in/angadsinghmanchanda", 
 "https://www.linkedin.com/in/gurleen-kaur-bb0297116", 
 "https://www.linkedin.com/in/milan-dholakiya", 
 "https://www.linkedin.com/in/srinivasraodyga", 
 "https://www.linkedin.com/in/paresh-m-aa286119", 
 "https://www.linkedin.com/in/iakashchauhan", 
 "https://www.linkedin.com/in/shivam-bhateja", 
 "https://www.linkedin.com/in/maulikmasrani", 
 "https://www.linkedin.com/in/hjdeshmukh", 
 "https://www.linkedin.com/in/yamika-p-6b6131179", 
 "https://www.linkedin.com/in/jigneshgohel", 
 "https://www.linkedin.com/in/rvikant", 
 "https://www.linkedin.com/in/ramkrishnanmuduli", 
 "https://www.linkedin.com/in/nitin-singh-62a2441ba", 
 "https://www.linkedin.com/in/smit-joshi", 
 "https://www.linkedin.com/in/rifad", 
 "https://www.linkedin.com/in/praveenkapoor", 
 "https://www.linkedin.com/in/dhvanil-patel", 
 "https://www.linkedin.com/in/shekharsmn", 
 "https://www.linkedin.com/in/arpit-mishra-trancis", 
 "https://www.linkedin.com/in/ravi-raina-360b4821", 
 "https://www.linkedin.com/in/prerna-gupta-3704171b9", 
 "https://www.linkedin.com/in/sachingharge143", 
 "https://www.linkedin.com/in/srivathsan296", 
 "https://www.linkedin.com/in/kubber", 
 "https://www.linkedin.com/in/ajitg80", 
 "https://www.linkedin.com/in/pinku-singh-89ba35164", 
 "https://www.linkedin.com/in/javed-raza-naqvi-93793763", 
 "https://www.linkedin.com/in/anand-ramchandran-b305a8146", 
 "https://www.linkedin.com/in/hargunn-kaur-1a09931b8", 
 "https://www.linkedin.com/in/anand-singh-balyan", 
 "https://www.linkedin.com/in/karmeshghosh", 
 "https://www.linkedin.com/in/sandeep-website-android-app-developer-meerut", 
 "https://www.linkedin.com/in/akash-bhivgade-8baa751b0", 
 "https://www.linkedin.com/in/shreekumarr", 
 "https://www.linkedin.com/in/dhiraj-rathore-573593174", 
 "https://www.linkedin.com/in/anju-a-01497b158", 
 "https://www.linkedin.com/in/iprashantjain", 
 "https://www.linkedin.com/in/aditinayar", 
 "https://www.linkedin.com/in/dipin-chawla-b6138a6b", 
 "https://www.linkedin.com/in/shivani-sinha-223639145", 
 "https://www.linkedin.com/in/akansha-mathur-2542a81b4", 
 "https://www.linkedin.com/in/nipunsharmaa", 
 "https://www.linkedin.com/in/digitalskywalk", 
 "https://www.linkedin.com/in/rashmi-varma-12834b1a6", 
 "https://www.linkedin.com/in/abhinay-bajpai-b1a407183", 
 "https://www.linkedin.com/in/rishit-mashkaria", 
 "https://www.linkedin.com/in/chirag-jhamb-33209b174", 
 "https://www.linkedin.com/in/priti-singh-87933417a", 
 "https://www.linkedin.com/in/john-bailey-9990901b5", 
 "https://www.linkedin.com/in/pankaj-belawal-751b7b18b", 
 "https://www.linkedin.com/in/vipul-gupta-1188383b", 
 "https://www.linkedin.com/in/prachi-jain-528193199", 
 "https://www.linkedin.com/in/ashmi-shah", 
 "https://www.linkedin.com/in/motiverge-travel-002045159", 
 "https://www.linkedin.com/in/dm-vikram", 
 "https://www.linkedin.com/in/vishhalpathak", 
 "https://www.linkedin.com/in/hardev-singh-bartwal", 
 "https://www.linkedin.com/in/danny-b-3312331b2", 
 "https://www.linkedin.com/in/bhanuj-sharma-36645737", 
 "https://www.linkedin.com/in/devikaprakash5", 
 "https://www.linkedin.com/in/ashok-patidar-180b451b2", 
 "https://www.linkedin.com/in/sahil-deshwal-476585153", 
 "https://www.linkedin.com/in/puspendu-roy-8114a3119", 
 "https://www.linkedin.com/in/orchid-hospitality-and-holidays-8ba11a19b", 
 "https://www.linkedin.com/in/priyankaaa-singhhh", 
 "https://www.linkedin.com/in/iamjatinnanda", 
 "https://www.linkedin.com/in/melony-melon-songphakdi-855699148", 
 "https://www.linkedin.com/in/sanjeevpandeyoffical", 
 "https://www.linkedin.com/in/ahassanjavaid", 
 "https://www.linkedin.com/in/deepratna", 
 "https://www.linkedin.com/in/marzia-akhter-6599701a9", 
 "https://www.linkedin.com/in/adarsh-yadav-2756a8116", 
 "https://www.linkedin.com/in/sanjay-kumar-srivastava-0671606", 
 "https://www.linkedin.com/in/satendra-pal-86614238", 
 "https://www.linkedin.com/in/nidhi-rajpu", 
 "https://www.linkedin.com/in/chirag-chheda-76890074", 
 "https://www.linkedin.com/in/akgrowthhacker", 
 "https://www.linkedin.com/in/mohammad-zaigam-606445141", 
 "https://www.linkedin.com/in/gyaneshwar-dwivedi-22922445", 
 "https://www.linkedin.com/in/tuanamit", 
 "https://www.linkedin.com/in/jignesh-raval-73196552", 
 "https://www.linkedin.com/in/vikrant-sharma-47753922", 
 "https://www.linkedin.com/in/ompuran", 
 "https://www.linkedin.com/in/anshuman-patnaik", 
 "https://www.linkedin.com/in/pradeepkotian", 
 "https://www.linkedin.com/in/narayannayak1", 
 "https://www.linkedin.com/in/syed-s-42b850167", 
 "https://www.linkedin.com/in/surendra-singh-46a75352", 
 "https://www.linkedin.com/in/jatin-bagga-8a113943", 
 "https://www.linkedin.com/in/mukul-verma-043a4a192", 
 "https://www.linkedin.com/in/prince001mittal", 
 "https://www.linkedin.com/in/sanya-grover-b3b019195", 
 "https://www.linkedin.com/in/hitesh-mathur-healthcare", 
 "https://www.linkedin.com/in/ashish-gautam-624b9757", 
 "https://www.linkedin.com/in/sana-ansari", 
 "https://www.linkedin.com/in/narendra-sorathiya", 
 "https://www.linkedin.com/in/amit-verma-007", 
 "https://www.linkedin.com/in/azharmagray", 
 "https://www.linkedin.com/in/atulverma-digital-marketing-consultant", 
 "https://www.linkedin.com/in/nghura", 
 "https://www.linkedin.com/in/shalabh-sharma", 
 "https://www.linkedin.com/in/akash-saini-2592681a1", 
 "https://www.linkedin.com/in/kanika-phalswal-7726bb1a2", 
 "https://www.linkedin.com/in/vaibhav-sharma-8a56491a0", 
 "https://www.linkedin.com/in/anukrati-goyal", 
 "https://www.linkedin.com/in/neha-ahuja-372847143", 
 "https://www.linkedin.com/in/nitish-sharma-2b2156b6", 
 "https://www.linkedin.com/in/pramodmore672", 
 "https://www.linkedin.com/in/rahul-singh-jurel-795216196", 
 "https://www.linkedin.com/in/realsachingupta", 
 "https://www.linkedin.com/in/ganesh-patil-471125195", 
 "https://www.linkedin.com/in/abhijeetjha", 
 "https://www.linkedin.com/in/hina-phukan-16496512", 
 "https://www.linkedin.com/in/akmishraa", 
 "https://www.linkedin.com/in/ashish-singh-67bb39198", 
 "https://www.linkedin.com/in/sukhcharan-singh-7b762059", 
 "https://www.linkedin.com/in/monika-sriswal-0ba833198", 
 "https://www.linkedin.com/in/simran-jha-771429115", 
 "https://www.linkedin.com/in/digambar-joshi-8ab10110b", 
 "https://www.linkedin.com/in/ryanhallxe", 
 "https://www.linkedin.com/in/shivani-singh-140469196", 
 "https://www.linkedin.com/in/connectchiragarora", 
 "https://www.linkedin.com/in/mdrfi", 
 "https://www.linkedin.com/in/karuna-chhabra-451400195", 
 "https://www.linkedin.com/in/jenniferbaxla", 
 "https://www.linkedin.com/in/shivamfreelancer", 
 "https://www.linkedin.com/in/shalini-prajapati-36316b160", 
 "https://www.linkedin.com/in/pratishtha-gupta-b900b3144", 
 "https://www.linkedin.com/in/abhijeet-guha", 
 "https://www.linkedin.com/in/jagravigarg", 
 "https://www.linkedin.com/in/therajneeshverma", 
 "https://www.linkedin.com/in/aktripathi167", 
 "https://www.linkedin.com/in/richa-pal-13615452", 
 "https://www.linkedin.com/in/neha-singh-a0a79018b", 
 "https://www.linkedin.com/in/hariom-get-digital", 
 "https://www.linkedin.com/in/sonal-govil", 
 "https://www.linkedin.com/in/rajendra-bhattar-1a410113", 
 "https://www.linkedin.com/in/tayaba-akter", 
 "https://www.linkedin.com/in/shivamintellemo", 
 "https://www.linkedin.com/in/jatinbindal", 
 "https://www.linkedin.com/in/shivani-v-a82659164", 
 "https://www.linkedin.com/in/nikita-joshi-198136185", 
 "https://www.linkedin.com/in/ranjitmazumdar", 
 "https://www.linkedin.com/in/piyush-sonariya-6719a4158", 
 "https://www.linkedin.com/in/servamas-hospitality-198930128", 
 "https://www.linkedin.com/in/sachink14", 
 "https://www.linkedin.com/in/aarjoo-khan-04aa99180", 
 "https://www.linkedin.com/in/kuldeepkaul", 
 "https://www.linkedin.com/in/pratyusha-prattipati", 
 "https://www.linkedin.com/in/shaubhik-gupta-13784514", 
 "https://www.linkedin.com/in/sandeep-mehta-b464aa185", 
 "https://www.linkedin.com/in/itsarunvarghese", 
 "https://www.linkedin.com/in/milesanas", 
 "https://www.linkedin.com/in/manish-satyam-479383133", 
 "https://www.linkedin.com/in/anirban-chakravarty", 
 "https://www.linkedin.com/in/gurinderkhera", 
 "https://www.linkedin.com/in/avdhesh-kumar-digital-marketing", 
 "https://www.linkedin.com/in/gurmeet-singh-5aa54341", 
 "https://www.linkedin.com/in/manasa-g-84a3b3175", 
 "https://www.linkedin.com/in/ajay-krishna-digital-marketing", 
 "https://www.linkedin.com/in/anikthaguptha", 
 "https://www.linkedin.com/in/vishnupnair03", 
 "https://www.linkedin.com/in/shrawan-kumar-dar-41365560", 
 "https://www.linkedin.com/in/piyush-sachan-654346137", 
 "https://www.linkedin.com/in/gyaank", 
 "https://www.linkedin.com/in/monika-gupta-8a31bb15a", 
 "https://www.linkedin.com/in/pritam-bora-55173689", 
 "https://www.linkedin.com/in/soutien-infotech-2aba31139", 
 "https://www.linkedin.com/in/jyotisharma-microhost", 
 "https://www.linkedin.com/in/kondapallitarunkumar", 
 "https://www.linkedin.com/in/prajyot02", 
 "https://www.linkedin.com/in/karishma-vashist-aaveg", 
 "https://www.linkedin.com/in/prashank-dubey", 
 "https://www.linkedin.com/in/rohit-bajpai", 
 "https://www.linkedin.com/in/rishab-seth-411989120", 
 "https://www.linkedin.com/in/shubham-srivastav-86231415a", 
 "https://www.linkedin.com/in/kapilanand", 
 "https://www.linkedin.com/in/sparshgaur", 
 "https://www.linkedin.com/in/soumya-bajaj-49a672133", 
 "https://www.linkedin.com/in/anjalipriya06", 
 "https://www.linkedin.com/in/gourav-singh-11a5181a", 
 "https://www.linkedin.com/in/vimal-soni-37474437", 
 "https://www.linkedin.com/in/amardeep-chadda-a7702a22", 
 "https://www.linkedin.com/in/muskan-aazmi-04a357132", 
 "https://www.linkedin.com/in/ridhima-sharma-31b4b45b", 
 "https://www.linkedin.com/in/ruchingupta", 
 "https://www.linkedin.com/in/sangam-shilpa-97747616b", 
 "https://www.linkedin.com/in/parul-goyal-658751144", 
 "https://www.linkedin.com/in/bijudubai2024", 
 "https://www.linkedin.com/in/reetu-singh-26471516b", 
 "https://www.linkedin.com/in/harsan-jones-791668a0", 
 "https://www.linkedin.com/in/ritu-verma-884618166", 
 "https://www.linkedin.com/in/vishalsharma2", 
 "https://www.linkedin.com/in/mohammad-khalid-14396060", 
 "https://www.linkedin.com/in/praveen-chandrasekaran-013581104", 
 "https://www.linkedin.com/in/followsattya", 
 "https://www.linkedin.com/in/subhradip-mandal-8567765b", 
 "https://www.linkedin.com/in/manoj-singh-chouhan-ab2943b9", 
 "https://www.linkedin.com/in/glowonitcom", 
 "https://www.linkedin.com/in/sathishkumar-narayanan-05568a37", 
 "https://www.linkedin.com/in/vishalsingla2013", 
 "https://www.linkedin.com/in/priyangagarwal", 
 "https://www.linkedin.com/in/kaustubhnande", 
 "https://www.linkedin.com/in/nitinkarkara", 
 "https://www.linkedin.com/in/ankurmarketing", 
 "https://www.linkedin.com/in/sameer-abdul-sathar-mba-cm-0826741b", 
 "https://www.linkedin.com/in/sangeeta-garg", 
 "https://www.linkedin.com/in/sushil-mishra-44003715", 
 "https://www.linkedin.com/in/abhishek1987", 
 "https://www.linkedin.com/in/alok-kumar-038496159", 
 "https://www.linkedin.com/in/pratik-chaki-49451a28", 
 "https://www.linkedin.com/in/muthukumarjs", 
 "https://www.linkedin.com/in/amareeshkalra", 
 "https://www.linkedin.com/in/rahul-sharma-terrano-papers-printing-papers", 
 "https://www.linkedin.com/in/ravi-pratap-singh-8a1846143", 
 "https://www.linkedin.com/in/bibeknayak", 
 "https://www.linkedin.com/in/jagbirs", 
 "https://www.linkedin.com/in/kaberi-gogoi-003b24142", 
 "https://www.linkedin.com/in/harsh-tiwari-73535616", 
 "https://www.linkedin.com/in/stacey-mcclenathan-a8274b5", 
 "https://www.linkedin.com/in/rucheekachhugani", 
 "https://www.linkedin.com/in/chaitanyakaushal", 
 "https://www.linkedin.com/in/golamazam1987", 
 "https://www.linkedin.com/in/ahmad-rizvi-bb2911112", 
 "https://www.linkedin.com/in/nitesh-verma-9a9b9060", 
 "https://www.linkedin.com/in/nasrivastava", 
 "https://www.linkedin.com/in/adya-aagarwal-072149157", 
 "https://www.linkedin.com/in/shah-pritesh-14834b9a", 
 "https://www.linkedin.com/in/shaktiprabha", 
 "https://www.linkedin.com/in/devanbhalla", 
 "https://www.linkedin.com/in/farida-khatoon", 
 "https://www.linkedin.com/in/imkatyaynisharma", 
 "https://www.linkedin.com/in/swapnil-kulkarni-31b81163", 
 "https://www.linkedin.com/in/mohd-nadeem-alam", 
 "https://www.linkedin.com/in/ramandeep-bishnoi-54874a159", 
 "https://www.linkedin.com/in/prashant-s-shriyan", 
 "https://www.linkedin.com/in/vishalsinghcoach", 
 "https://www.linkedin.com/in/digitalmarketingseoexpertdelhi", 
 "https://www.linkedin.com/in/oseldigital", 
 "https://www.linkedin.com/in/sandeep-p-bahukhandi-578b3463", 
 "https://www.linkedin.com/in/samridhi-sabharwal-4b7079132", 
 "https://www.linkedin.com/in/satish-upadhyay-172b4799", 
 "https://www.linkedin.com/in/pralhadtarde", 
 "https://www.linkedin.com/in/rajdeep-sikdar-7a161017", 
 "https://www.linkedin.com/in/pankaj-puri-25308b8", 
 "https://www.linkedin.com/in/kirtisingh203", 
 "https://www.linkedin.com/in/hitesh-panchal-57202415a", 
 "https://www.linkedin.com/in/kumar-gaurav-aab84059", 
 "https://www.linkedin.com/in/drvijaymalhotra", 
 "https://www.linkedin.com/in/kavish-dongare-68b74441", 
 "https://www.linkedin.com/in/%E2%9C%88-rajeev-%E2%9C%88-s-00040a18", 
 "https://www.linkedin.com/in/jpoovadan", 
 "https://www.linkedin.com/in/ceo-bpawan1970", 
 "https://www.linkedin.com/in/sandeip-kumar", 
 "https://www.linkedin.com/in/akash-misra", 
 "https://www.linkedin.com/in/kotesh-reddy-62595813a", 
 "https://www.linkedin.com/in/esham-y-54322bb2", 
 "https://www.linkedin.com/in/akshita-ahuja-b03a97157", 
 "https://www.linkedin.com/in/gayatri-bhardwaj-28a2b87", 
 "https://www.linkedin.com/in/ugarhwal", 
 "https://www.linkedin.com/in/sreenathaa", 
 "https://www.linkedin.com/in/devanshu-dsitexperts", 
 "https://www.linkedin.com/in/gaurav-mehta-7a85234", 
 "https://www.linkedin.com/in/nandinichandra", 
 "https://www.linkedin.com/in/ishangkk", 
 "https://www.linkedin.com/in/dinesh-pathak-3a6051143", 
 "https://www.linkedin.com/in/subodh-kumar-30b64a26", 
 "https://www.linkedin.com/in/manzoor-ali-907b3b4", 
 "https://www.linkedin.com/in/dr-rawann-kumaar-hastir-sharma-phd-mktg-strategy-retention-performance-marketing-2740384b", 
 "https://www.linkedin.com/in/sabyasachihalder", 
 "https://www.linkedin.com/in/vikramjethwani", 
 "https://www.linkedin.com/in/sophie-halfmann-79816a35", 
 "https://www.linkedin.com/in/nikitaprakash1", 
 "https://www.linkedin.com/in/anuraagkashyap", 
 "https://www.linkedin.com/in/deepti-bhattacharya-49123b70", 
 "https://www.linkedin.com/in/sangeeta-garg-6297b917", 
 "https://www.linkedin.com/in/jyoti-sinha-612a8b3b", 
 "https://www.linkedin.com/in/dm-poojatiwari", 
 "https://www.linkedin.com/in/karan-chawla-0b0833153", 
 "https://www.linkedin.com/in/sagarchaudhary92", 
 "https://www.linkedin.com/in/kalpesh-gandhi-4a3b3715", 
 "https://www.linkedin.com/in/harishdigitalmarketing", 
 "https://www.linkedin.com/in/sunil-purohit-632ba737", 
 "https://www.linkedin.com/in/anjani-kumar-mishra-digital-marketing-consultant", 
 "https://www.linkedin.com/in/jagrit-mahajan-2491122b", 
 "https://www.linkedin.com/in/bijay-sahu-06050738", 
 "https://www.linkedin.com/in/arunimamajumdar", 
 "https://www.linkedin.com/in/naveen-kumar-online-business-growth-digital-marketing-consultant-delhi-india", 
 "https://www.linkedin.com/in/manish-kr-chaudhary-8580b62", 
 "https://www.linkedin.com/in/rohit-vats", 
 "https://www.linkedin.com/in/dharmveer9899807189", 
 "https://www.linkedin.com/in/mohd-danish-ansari", 
 "https://www.linkedin.com/in/digimarkland", 
 "https://www.linkedin.com/in/srichn", 
 "https://www.linkedin.com/in/akhil-pandey-67068953", 
 "https://www.linkedin.com/in/eva-bayer-6473373a", 
 "https://www.linkedin.com/in/manujbajaj", 
 "https://www.linkedin.com/in/kudrat-kahlon", 
 "https://www.linkedin.com/in/sanjivvinaik", 
 "https://www.linkedin.com/in/vikas-kumar-patel", 
 "https://www.linkedin.com/in/marc-robinson-21166282", 
 "https://www.linkedin.com/in/swatijaine", 
 "https://www.linkedin.com/in/muhammad-mubashir-boxer-53025728", 
 "https://www.linkedin.com/in/bhaktib-shetty-84901587", 
 "https://www.linkedin.com/in/sriyam-suman-96745312a", 
 "https://www.linkedin.com/in/ravindra-patil-4821b2a", 
 "https://www.linkedin.com/in/mayank-singhal", 
 "https://www.linkedin.com/in/sam-jk-25b76373", 
 "https://www.linkedin.com/in/rovina-poovaiah-7626b6143", 
 "https://www.linkedin.com/in/puneetchhahira", 
 "https://www.linkedin.com/in/kothari-pranay", 
 "https://www.linkedin.com/in/raju-tsn-a0bb3b17", 
 "https://www.linkedin.com/in/kusum-singh-254099140", 
 "https://www.linkedin.com/in/saurabhseth1107", 
 "https://www.linkedin.com/in/sachinvashishtha", 
 "https://www.linkedin.com/in/jovana-milacic-5875036b", 
 "https://www.linkedin.com/in/francisxavier", 
 "https://www.linkedin.com/in/pr-digital-sales-marketing-branding-priyam-chakraborty-a32a48110", 
 "https://www.linkedin.com/in/rupanjali", 
 "https://www.linkedin.com/in/abhishekkaul1000", 
 "https://www.linkedin.com/in/rohitaraut", 
 "https://www.linkedin.com/in/seosmoconsultantdelhi", 
 "https://www.linkedin.com/in/ankit-goyal-501056b5", 
 "https://www.linkedin.com/in/rajatmaestro", 
 "https://www.linkedin.com/in/vimal-kumar-nathani-30aba956", 
 "https://www.linkedin.com/in/prem-r-singh-2b728843", 
 "https://www.linkedin.com/in/nikhil-abhishek-mishra-407a6084", 
 "https://www.linkedin.com/in/bhushan-shelar-92a50212", 
 "https://www.linkedin.com/in/rahul-gupta-3b74b53", 
 "https://www.linkedin.com/in/authordevika", 
 "https://www.linkedin.com/in/ruchirabose", 
 "https://www.linkedin.com/in/sagarpratapsingh", 
 "https://www.linkedin.com/in/jukkab", 
 "https://www.linkedin.com/in/elizabethtmccauley", 
 "https://www.linkedin.com/in/ellapartook", 
 "https://www.linkedin.com/in/rayzchan", 
 "https://www.linkedin.com/in/sachinsaxena-innovaccer", 
 "https://www.linkedin.com/in/rupesh-rawat-a85b7766", 
 "https://www.linkedin.com/in/vyshakiyengar", 
 "https://www.linkedin.com/in/mecyborg", 
 "https://www.linkedin.com/in/anubhabachhety", 
 "https://www.linkedin.com/in/rajesh-singh-chaudhary-70b568b1", 
 "https://www.linkedin.com/in/kanika-arora-maheshwari", 
 "https://www.linkedin.com/in/ankur-dev-17994317", 
 "https://www.linkedin.com/in/gopi-krishna", 
 "https://www.linkedin.com/in/animesh-kumar-69b40230", 
 "https://www.linkedin.com/in/apoorvabagchi", 
 "https://www.linkedin.com/in/akansha-thakur-471782b6", 
 "https://www.linkedin.com/in/deepak-growth-hacker-india", 
 "https://www.linkedin.com/in/rajeswari-n-2a9a87126", 
 "https://www.linkedin.com/in/jassodhi", 
 "https://www.linkedin.com/in/nehaa-bhandari-671192ba", 
 "https://www.linkedin.com/in/arunmalkani", 
 "https://www.linkedin.com/in/amit-singh-902475118", 
 "https://www.linkedin.com/in/shailpandey", 
 "https://www.linkedin.com/in/supriyakyzer", 
 "https://www.linkedin.com/in/punitdharamsi", 
 "https://www.linkedin.com/in/ajay-rawat-4399b318", 
 "https://www.linkedin.com/in/srinivas-k-04564010", 
 "https://www.linkedin.com/in/amir-hashmi-09a26147", 
 "https://www.linkedin.com/in/reach4mishra", 
 "https://www.linkedin.com/in/rakesh-mehta-835b9a11a", 
 "https://www.linkedin.com/in/kalyan-a-b0027b128", 
 "https://www.linkedin.com/in/paresh-vankar-420635", 
 "https://www.linkedin.com/in/getforex", 
 "https://www.linkedin.com/in/pallavi-patil-594636108", 
 "https://www.linkedin.com/in/vinodsinghr", 
 "https://www.linkedin.com/in/amit-kumar-singh-7835b187", 
 "https://www.linkedin.com/in/deepak-namdev-36649366", 
 "https://www.linkedin.com/in/pulkit-verma-32574921", 
 "https://www.linkedin.com/in/jay-rambhia-b29948a4", 
 "https://www.linkedin.com/in/vishal-agarwal-66b0a6127", 
 "https://www.linkedin.com/in/manishbgupta", 
 "https://www.linkedin.com/in/rohit-rusia-b606ba54", 
 "https://www.linkedin.com/in/alhad123", 
 "https://www.linkedin.com/in/ramniwash", 
 "https://www.linkedin.com/in/pritika-dutt-5201bb30", 
 "https://www.linkedin.com/in/swati-aggarwal-97642343", 
 "https://www.linkedin.com/in/himanshi-rathore-93305858", 
 "https://www.linkedin.com/in/devaki-sahasrabudhe-edtech-specialist", 
 "https://www.linkedin.com/in/binitashah", 
 "https://www.linkedin.com/in/george-kuriakose-33603724", 
 "https://www.linkedin.com/in/anand-shaw-7185747a", 
 "https://www.linkedin.com/in/shabbarshayer", 
 "https://www.linkedin.com/in/deepakbulchandani", 
 "https://www.linkedin.com/in/roshan-nair-05a74a19", 
 "https://www.linkedin.com/in/lakshya-k-84830075", 
 "https://www.linkedin.com/in/ajaymbeian", 
 "https://www.linkedin.com/in/krishnakumar-s94", 
 "https://www.linkedin.com/in/subhendupattnaik", 
 "https://www.linkedin.com/in/priya-sachan-529579b2", 
 "https://www.linkedin.com/in/kannarathil", 
 "https://www.linkedin.com/in/devi-ch-77796b110", 
 "https://www.linkedin.com/in/ruchi-t-21b469109", 
 "https://www.linkedin.com/in/rajiv-ranjan-singh-6b9850a0", 
 "https://www.linkedin.com/in/abhishek1221", 
 "https://www.linkedin.com/in/deepak-nagpal-60ab772a", 
 "https://www.linkedin.com/in/aneal-sharrma-5780a920", 
 "https://www.linkedin.com/in/vimal-sumbly-2797675", 
 "https://www.linkedin.com/in/manojsaxena92", 
 "https://www.linkedin.com/in/nitin-delhi-43a85715", 
 "https://www.linkedin.com/in/jasmeet-bedi-990b6837", 
 "https://www.linkedin.com/in/mohammad-ausaful-haque-8b450b17", 
 "https://www.linkedin.com/in/tapas-04332217", 
 "https://www.linkedin.com/in/pradeep-singh-narwal-8426a020", 
 "https://www.linkedin.com/in/gaurrav-tikoo-9538486", 
 "https://www.linkedin.com/in/prasandeep-jangwal-25a5b933", 
 "https://www.linkedin.com/in/vinit-kumar-satpuri-b6553661", 
 "https://www.linkedin.com/in/saurabh-ram-kapoor-70884343", 
 "https://www.linkedin.com/in/adikap", 
 "https://www.linkedin.com/in/nitish-mandhar-3266a812", 
 "https://www.linkedin.com/in/soniamrita", 
 "https://www.linkedin.com/in/deepikaboddula04", 
 "https://www.linkedin.com/in/akash-kori-", 
 "https://www.linkedin.com/in/mohana-lakshmi-698452250", 
 "https://www.linkedin.com/in/avantika-chaudhary-76bba1230", 
 "https://www.linkedin.com/in/astha-sethi-b59230232", 
 "https://www.linkedin.com/in/abhijit-roy-373901131", 
 "https://www.linkedin.com/in/alyssa-nguyen-13354b21a", 
 "https://www.linkedin.com/in/rishav-bagchi-947747208", 
 "https://www.linkedin.com/in/maryam-n-279763166", 
 "https://www.linkedin.com/in/amanprodx", 
 "https://www.linkedin.com/in/hannah-reddy-0a46a6183", 
 "https://www.linkedin.com/in/gyan-teotia-9b7489137", 
 "https://www.linkedin.com/in/shaurya-gaur-b22a911a8", 
 "https://www.linkedin.com/in/sarfraz-sr-biz-dev-officer-1b4b68110", 
 "https://www.linkedin.com/in/indhumathi-g-8690b81a5", 
 "https://www.linkedin.com/in/anamika-verma-0b526717b", 
 "https://www.linkedin.com/in/digitalmarketingaxpert", 
 "https://www.linkedin.com/in/chhavi-baliyan-3bb60b168", 
 "https://www.linkedin.com/in/sandip-singh-3318a5138", 
 "https://www.linkedin.com/in/parul-goel-a22275177", 
 "https://www.linkedin.com/in/sai-palavi-494471114", 
 "https://www.linkedin.com/in/naveen-kumar-7229777a", 
 "https://www.linkedin.com/in/atif-shaikh-94794a156", 
 "https://www.linkedin.com/in/ivarunahuja", 
 "https://www.linkedin.com/in/shaik-asif-280a61b7", 
 "https://www.linkedin.com/in/syed-nishad-381117154", 
 "https://www.linkedin.com/in/mansi-shah-4510", 
 "https://www.linkedin.com/in/sahil-ranzil-singh-6b912a129", 
 "https://www.linkedin.com/in/seva-ram-sumal-583513a6", 
 "https://www.linkedin.com/in/gurpreet-kaur-7901b1b8", 
 "https://www.linkedin.com/in/anjali-tripathi-1a347668", 
 "https://www.linkedin.com/in/priyanka-goppa-139359115", 
 "https://www.linkedin.com/in/manishabrinok", 
 "https://www.linkedin.com/in/himani-singh-2b0499142", 
 "https://www.linkedin.com/in/sunil-cp-13942b105", 
 "https://www.linkedin.com/in/khushboo-verma-4b731a100", 
 "https://www.linkedin.com/in/parineetha-sanjay-98209487", 
 "https://www.linkedin.com/in/gunjan-kapoor-9a8874124", 
 "https://www.linkedin.com/in/kriya-s-98b4a7101", 
 "https://www.linkedin.com/in/reshma-pradeep-91099b12a", 
 "https://www.linkedin.com/in/atikshasoni", 
 "https://www.linkedin.com/in/shannon-etts-69435a203", 
 "https://www.linkedin.com/in/ranjit-singh-4941ba22", 
 "https://www.linkedin.com/in/priyank-malhotra-1a2597209", 
 "https://www.linkedin.com/in/nidhi-chhabra-88a22a183", 
 "https://www.linkedin.com/in/danielrobertfrank", 
 "https://www.linkedin.com/in/chandrasekhar-nandam-a8a222192", 
 "https://www.linkedin.com/in/rajender-singh-negi-aa7b5b1ab", 
 "https://www.linkedin.com/in/singharshita", 
 "https://www.linkedin.com/in/mohd-faheem-80139111b", 
 "https://www.linkedin.com/in/sanjeev-adhikari-19a832190", 
 "https://www.linkedin.com/in/naveesha-gupta-6013a6185", 
 "https://www.linkedin.com/in/piyush-devani-15b63613a", 
 "https://www.linkedin.com/in/pachanipratik", 
 "https://www.linkedin.com/in/karanparikh2", 
 "https://www.linkedin.com/in/shubhendu-kainthoola-5b26315a", 
 "https://www.linkedin.com/in/atul-tyagi-73436b195", 
 "https://www.linkedin.com/in/raktimranjanharidwas1998", 
 "https://www.linkedin.com/in/priyanka-sharma-02426a168", 
 "https://www.linkedin.com/in/vishalprajapati13", 
 "https://www.linkedin.com/in/somesh-chouhan", 
 "https://www.linkedin.com/in/rathan-gowda-7a068b195", 
 "https://www.linkedin.com/in/pratikduttatechinsights", 
 "https://www.linkedin.com/in/madhav07-agarwal", 
 "https://www.linkedin.com/in/runita-bezalwar", 
 "https://www.linkedin.com/in/acbhat", 
 "https://www.linkedin.com/in/parthiban-palanisamy-1a040228", 
 "https://www.linkedin.com/in/surbhi-handa-5a3098158", 
 "https://www.linkedin.com/in/ruchi-singhal-5b1b3619", 
 "https://www.linkedin.com/in/rameshakash", 
 "https://www.linkedin.com/in/harshbgupta", 
 "https://www.linkedin.com/in/shankar-g-52b8046a", 
 "https://www.linkedin.com/in/jaiswalsmita", 
 "https://www.linkedin.com/in/abhiram-artham-70137a10b", 
 "https://www.linkedin.com/in/nitishk-sharma", 
 "https://www.linkedin.com/in/pratiksha-ghadge-3a0779a9", 
 "https://www.linkedin.com/in/sethdivya", 
 "https://www.linkedin.com/in/cs-tanmoy-ghosh-11b70676", 
 "https://www.linkedin.com/in/afsarm", 
 "https://www.linkedin.com/in/rahul-choudhary-27194287", 
 "https://www.linkedin.com/in/irfanbuddaseth", 
 "https://www.linkedin.com/in/mithun-lotlikar-6871b61b", 
 "https://www.linkedin.com/in/denny-alex-56063b151", 
 "https://www.linkedin.com/in/rohini-thakur-27108998", 
 "https://www.linkedin.com/in/richamalviya", 
 "https://www.linkedin.com/in/imranalam0804", 
 "https://www.linkedin.com/in/deepak-saini-35b77129", 
 "https://www.linkedin.com/in/sumeit-kapoor-67820b25", 
 "https://www.linkedin.com/in/laxman-marne-148a5835", 
 "https://www.linkedin.com/in/shwetasingh89", 
 "https://www.linkedin.com/in/manjunath-mathad-7358713b", 
 "https://www.linkedin.com/in/anmoldixit", 
 "https://www.linkedin.com/in/ankit-phophaliya-44619b33", 
 "https://www.linkedin.com/in/isha-raj-b3b4b358", 
 "https://www.linkedin.com/in/kalpana-shukla-11671435", 
 "https://www.linkedin.com/in/mayank-dimri-14b418101", 
 "https://www.linkedin.com/in/anupam-singh-aks", 
 "https://www.linkedin.com/in/sandeep-sharma-0bab5a5b", 
 "https://www.linkedin.com/in/nikshith-a-05310289", 
 "https://www.linkedin.com/in/ddtripathy", 
 "https://www.linkedin.com/in/ankit-nagpal-8595a054", 
 "https://www.linkedin.com/in/skv-ca", 
 "https://www.linkedin.com/in/ekta-bhalekar-patankar-75415146", 
 "https://www.linkedin.com/in/apoorva-dwivedi-200b175b", 
 "https://www.linkedin.com/in/manish-sharma-aa8138a", 
 "https://www.linkedin.com/in/akash-jain-3513b743", 
 "https://www.linkedin.com/in/ausaa", 
 "https://www.linkedin.com/in/amit-srivastava-19b5aa34", 
 "https://www.linkedin.com/in/satish-srivastava-a2376b38", 
 "https://www.linkedin.com/in/pulkit-garg-07959116", 
 "https://www.linkedin.com/in/siddharth-pal-11094a23", 
 "https://www.linkedin.com/in/samir-malik-63354832"
];

// Configuration with customized delays
const CONFIG = {
  MANUAL_LOGIN_WAIT: 120000, // 2 minutes for manual login
  PAGE_LOAD_DELAY: 30000,    // 30 seconds after page load
  MORE_BUTTON_DELAY: 5000,   // 5 seconds after More button
  REMOVE_BUTTON_DELAY: 7000, // 7 seconds after Remove Connection
  PROFILE_DELAY: 20000,      // 20 seconds between profiles
  PAGE_TIMEOUT: 30000,
  MAX_RETRIES: 2
};

// Helper function for delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Save cookies to file
async function saveCookies(page) {
  try {
    const cookies = await page.cookies();
    fs.writeFileSync("cookies.json", JSON.stringify(cookies, null, 2));
    console.log("✅ Cookies saved successfully");
  } catch (error) {
    console.error("❌ Failed to save cookies:", error.message);
  }
}

// Load cookies from file
async function loadCookies(page) {
  try {
    if (fs.existsSync("cookies.json")) {
      const cookiesData = fs.readFileSync("cookies.json", 'utf8');
      const cookies = JSON.parse(cookiesData);
      
      if (cookies && cookies.length > 0) {
        await page.setCookie(...cookies);
        console.log("✅ Cookies loaded successfully");
        return true;
      }
    }
  } catch (error) {
    console.error("❌ Failed to load cookies:", error.message);
  }
  return false;
}

// Simple login check without navigation
async function isCurrentlyLoggedIn(page) {
  try {
    const currentUrl = page.url();
    
    if (currentUrl.includes('/login') || currentUrl.includes('/uas/login')) {
      return false;
    }
    
    if (currentUrl.includes('linkedin.com')) {
      const loggedInElements = await page.evaluate(() => {
        const indicators = [
          document.querySelector('.global-nav'),
          document.querySelector('[data-test-id="nav-search-typeahead-result"]'),
          document.querySelector('.share-box-feed-entry'),
          document.querySelector('#ember-search-typeahead'),
          document.querySelector('.feed-identity-module'),
          document.querySelector('.global-nav__nav')
        ];
        
        return indicators.some(el => el !== null);
      });
      
      return loggedInElements;
    }
    
    return false;
  } catch (error) {
    return false;
  }
}

// Wait for manual login with less interference
async function waitForManualLogin(page) {
  console.log("\n⚠️ MANUAL LOGIN REQUIRED");
  console.log("📝 Please complete these steps in the browser:");
  console.log("   1. Enter your LinkedIn email/phone and password");
  console.log("   2. Complete any 2FA/captcha if required");
  console.log("   3. Make sure you reach the LinkedIn feed page");
  console.log("   4. Keep the browser window open");
  console.log("\n💡 The script will wait 2 minutes and check periodically...\n");

  const startTime = Date.now();
  const maxWait = CONFIG.MANUAL_LOGIN_WAIT;
  let checkCount = 0;

  while (Date.now() - startTime < maxWait) {
    const remainingTime = Math.round((maxWait - (Date.now() - startTime)) / 1000);
    
    if (checkCount > 3) {
      process.stdout.write(`\r⏳ Waiting for login completion... ${remainingTime}s remaining                    `);
      await new Promise(r => setTimeout(r, 15000));
    } else {
      process.stdout.write(`\r⏳ Checking login... ${remainingTime}s remaining                    `);
      await new Promise(r => setTimeout(r, 10000));
    }
    
    checkCount++;
    
    const isLoggedIn = await isCurrentlyLoggedIn(page);
    if (isLoggedIn) {
      console.log("\n✅ Login successful! Proceeding...");
      return true;
    }
  }

  console.log("\n❌ Login timeout reached");
  return false;
}

// Test login by trying to access a protected page
async function testLoginStatus(page) {
  try {
    console.log("🔍 Verifying login status...");
    
    const response = await page.goto("https://www.linkedin.com/feed/", {
      waitUntil: "domcontentloaded",
      timeout: 20000,
    });
    
    await delay(CONFIG.PAGE_LOAD_DELAY); // 30s delay after navigation
    console.log("⏳ Waiting 30 seconds after page load...");
    
    const currentUrl = page.url();
    console.log(`📍 Final URL: ${currentUrl}`);
    
    if (currentUrl.includes('/login') || currentUrl.includes('/uas/login')) {
      return false;
    }
    
    const hasLoggedInElements = await page.evaluate(() => {
      const selectors = ['.global-nav', '.feed-identity-module', '#ember-search-typeahead'];
      return selectors.some(selector => document.querySelector(selector) !== null);
    });
    
    return hasLoggedInElements;
    
  } catch (error) {
    console.log("❌ Login test failed:", error.message);
    return false;
  }
}

// Remove Connection function with customized delays
async function removeConnection(page, profileUrl, retryCount = 0) {
  console.log(`\n👉 Processing: ${profileUrl} (Attempt ${retryCount + 1})`);
  
  try {
    // Navigate to profile
    console.log("🌐 Navigating to profile...");
    await page.goto(profileUrl, {
      waitUntil: "domcontentloaded",
      timeout: CONFIG.PAGE_TIMEOUT,
    });

    console.log("⏳ Waiting 30 seconds after page load...");
    await delay(CONFIG.PAGE_LOAD_DELAY); // 30s delay after navigation

    // Find and click More button
    console.log("🔍 Looking for More button...");
    const moreClicked = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const moreBtn = buttons.find(btn => {
        const text = btn.innerText || btn.getAttribute('aria-label') || '';
        return text.toLowerCase().includes('more');
      });
      
      if (moreBtn) {
        console.log('Found More button:', moreBtn.innerText);
        moreBtn.click();
        return true;
      }
      return false;
    });

    if (!moreClicked) {
      throw new Error("Could not find More button");
    }

    console.log("✅ Clicked More button");
    console.log("⏳ Waiting 5 seconds after clicking More button...");
    await delay(CONFIG.MORE_BUTTON_DELAY); // 5s delay after More button click

    // Look for Remove Connection option
    console.log("🔍 Looking for Remove Connection option...");
    const removeClicked = await page.evaluate(() => {
      console.log('Looking for Remove Connection option...');
      
      // Strategy 1: Look for exact text in clickable elements
      const clickableElements = Array.from(document.querySelectorAll('button, a, div[role="button"], [role="menuitem"]'));
      let removeBtn = clickableElements.find(el => {
        const text = (el.innerText || '').toLowerCase().trim();
        return text === 'remove connection' || text === 'remove connection.';
      });
      
      if (removeBtn) {
        console.log('Found Remove Connection button (Strategy 1):', removeBtn.innerText);
        removeBtn.click();
        return true;
      }
      
      // Strategy 2: Look for text that contains "remove connection"
      removeBtn = clickableElements.find(el => {
        const text = (el.innerText || '').toLowerCase();
        return text.includes('remove connection') && text.length < 25;
      });
      
      if (removeBtn) {
        console.log('Found Remove Connection button (Strategy 2):', removeBtn.innerText);
        removeBtn.click();
        return true;
      }
      
      // Strategy 3: Look in dropdown/menu items specifically
      const menuItems = Array.from(document.querySelectorAll('[role="menuitem"], .dropdown-item, .artdeco-dropdown__item'));
      removeBtn = menuItems.find(el => {
        const text = (el.innerText || el.textContent || '').toLowerCase().trim();
        return text.includes('remove connection');
      });
      
      if (removeBtn) {
        console.log('Found Remove Connection button (Strategy 3):', removeBtn.innerText);
        removeBtn.click();
        return true;
      }
      
      // Strategy 4: Look for spans with the text, then find parent clickable element
      const spans = Array.from(document.querySelectorAll('span'));
      const spanWithText = spans.find(span => {
        const text = (span.innerText || '').toLowerCase().trim();
        return text === 'remove connection';
      });
      
      if (spanWithText) {
        let parent = spanWithText.parentElement;
        while (parent) {
          if (parent.tagName === 'BUTTON' || parent.tagName === 'A' || parent.getAttribute('role') === 'button' || parent.getAttribute('role') === 'menuitem') {
            console.log('Found Remove Connection button (Strategy 4):', parent.innerText);
            parent.click();
            return true;
          }
          parent = parent.parentElement;
        }
      }
      
      // Log all available options for debugging
      console.log('Available dropdown options:');
      const allOptions = Array.from(document.querySelectorAll('button, a, [role="menuitem"], .dropdown-item'));
      allOptions.forEach((option, index) => {
        if (option.innerText && option.innerText.trim()) {
          console.log(`${index}: "${option.innerText.trim()}"`);
        }
      });
      
      return false;
    });

    if (!removeClicked) {
      console.log("⚠️ Could not find Remove Connection option");
      await page.screenshot({path: `debug_${Date.now()}.png`});
      console.log("📸 Screenshot saved for debugging");
      return false;
    }

    console.log("✅ Clicked Remove Connection option");
    console.log("⏳ Waiting 7 seconds after clicking Remove Connection...");
    await delay(CONFIG.REMOVE_BUTTON_DELAY); // 7s delay after Remove Connection click

    // Confirm removal
    console.log("🔍 Looking for confirmation button...");
    const confirmClicked = await page.evaluate(() => {
      console.log('Looking for confirmation button...');
      
      const buttons = Array.from(document.querySelectorAll('button'));
      const confirmBtn = buttons.find(btn => {
        const text = (btn.innerText || '').toLowerCase().trim();
        return text === 'remove' || text === 'confirm' || text === 'yes' || text.includes('remove connection');
      });
      
      if (confirmBtn) {
        console.log('Found confirmation button:', confirmBtn.innerText);
        confirmBtn.click();
        return true;
      }
      
      console.log('Available buttons for confirmation:');
      buttons.forEach((btn, index) => {
        if (btn.innerText && btn.innerText.trim()) {
          console.log(`${index}: "${btn.innerText.trim()}"`);
        }
      });
      
      return false;
    });

    if (confirmClicked) {
      console.log(`✅ Successfully removed connection: ${profileUrl}`);
    } else {
      console.log(`⚠️ Could not find confirmation button, but remove action may have succeeded`);
    }

    return true;

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    
    if (retryCount < CONFIG.MAX_RETRIES) {
      console.log(`🔄 Retrying in 30 seconds...`);
      await delay(30000); // 30s delay before retry
      return await removeConnection(page, profileUrl, retryCount + 1);
    }
    
    return false;
  }
}

// Main execution
(async () => {
  console.log("🚀 LinkedIn Connection Remover v2.3 (Optimized delays)");
  console.log("⏱️ Delays: Page load: 30s | More button: 5s | Remove button: 7s | Between profiles: 20s");
  
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

  try {
    // Step 1: Try existing cookies first
    let isLoggedIn = false;
    const cookiesLoaded = await loadCookies(page);

    if (cookiesLoaded) {
      isLoggedIn = await testLoginStatus(page);
    }

    // Step 2: Manual login if needed
    if (!isLoggedIn) {
      await page.goto("https://www.linkedin.com/login", {
        waitUntil: "domcontentloaded",
        timeout: 20000,
      });

      isLoggedIn = await waitForManualLogin(page);
      
      if (isLoggedIn) {
        await saveCookies(page);
        console.log("🎉 Login successful and cookies saved!");
        console.log("⏳ Waiting 30 seconds after successful login...");
        await delay(CONFIG.PAGE_LOAD_DELAY); // 30s delay after login
      } else {
        throw new Error("Login failed or timed out. Please try again.");
      }
    } else {
      console.log("✅ Already logged in with saved cookies!");
    }

    // Step 3: Process connections
    console.log(`\n📋 Starting to process ${profileLinks.length} connections...`);
    let successCount = 0;

    for (let i = 0; i < profileLinks.length; i++) {
      const link = profileLinks[i];
      console.log(`\n📊 Progress: ${i + 1}/${profileLinks.length}`);
      
      const success = await removeConnection(page, link);
      if (success) successCount++;

      // Wait between profiles (20 seconds)
      if (i < profileLinks.length - 1) {
        console.log(`⏳ Waiting 20 seconds before next profile...`);
        await delay(CONFIG.PROFILE_DELAY); // 20s delay between profiles
      }
    }

    console.log(`\n🎉 Process completed!`);
    console.log(`✅ Successfully processed: ${successCount}/${profileLinks.length}`);
    console.log(`❌ Failed: ${profileLinks.length - successCount}/${profileLinks.length}`);

  } catch (error) {
    console.error(`\n❌ Script error: ${error.message}`);
    console.log("\n💡 Try deleting cookies.json and running again if login issues persist");
  } finally {
    console.log("\n🏁 Closing browser in 10 seconds...");
    await new Promise(r => setTimeout(r, 10000));
    await browser.close();
  }
})();
