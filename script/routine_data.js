
const ROUTINE= {
    "sun": {
        '8': [],
        '9': [],
        '10': [],
        '11': ['CS541+_5-0_'],
        '12': ['CS541'],
        '1': [],
        '2': [],
        '3': [],
        '4': [],
        '5': [],
        '6': [],
    },
    "mon": {
        '8': [],
        '9': ['CE505', 'CE321', 'EE200', 'EE570', 'MA525', 'MA427', 'ME331', 'ME209', 'ME537', 'PH701', 'CB303', 'MM501'],
        '10': ['CE203', 'CE319', 'CE545', 'CS547', 'CS321', 'EE221', 'EE381', 'EE530', 'MA523', 'MA426', 'MH501', 'ME521', 'ME525', 'PH423', 'PH521', 'CB305', 'CS206', 'MM503', 'MM205'],
        '11': ['CB203', 'CE211', 'CS555', 'CS204', 'EE507', 'EE534', 'MA535', 'MA421', 'ME431', 'MH501', 'PH425', 'CS354', 'CH429', 'MM523', 'MM203'],
        '12': ['CB501', 'CH605', 'MA521', 'PH401', 'PH403', 'ME335', 'PH301', 'CS384', 'HS301', 'HS552', 'HS451', 'MA201', 'MA501', 'HS513'],
        '1': [],
        '2': ['CE571', 'CH521', 'CS577', 'MA503', 'ME503', 'PH429', 'PH604', 'PH608', 'HS233', 'HS201', 'HS231'],
        '3': ['CE213', 'CE549', 'CH425', 'CH523', 'EE370', 'EE540', 'MA429', 'ME501', 'ME393', 'PH525', 'CB407'],
        '4': ['CB401', 'CB211', 'CE547', 'CH525', 'EE523', 'MA425', 'MC594', 'MH503', 'ME393', 'PH502', 'PH702'],
        '5': ['CB401', 'CB211', 'MA539', 'MC594', 'ME393', 'PH421', 'PH523'],
        '6': ['CS571', 'CS561'],
    },
    "tue": {
        '8': [],
        '9': ['CE545', 'CS547', 'EE350', 'MA529', 'MA503', 'ME315', 'ME742', 'PH701', 'MA201'],
        '10': ['CE303', 'CE505', 'CS321', 'EE201', 'EE381', 'EE486', 'EE532', 'MA525', 'MA426', 'MH501', 'ME209', 'PH423', 'PH521', 'CS501', 'CS206', 'MM523', 'MM205'],
        '11': ['CB205', 'CE203', 'CE319', 'CH421', 'CS544', 'EE534', 'EE330', 'EE507', 'MA523', 'MA421', 'ME231', 'ME533', 'ME521', 'PH425', 'PH608', 'CS204', 'CS354', 'MM523'],
        '12': ['CB501', 'CE211', 'CH427', 'MA527', 'MA425', 'PH401', 'PH403', 'ME335', 'PH301', 'CS384', 'HS301', 'HS552', 'HS451', 'MA501', 'HS231', 'HS513'],
        '1': [],
        '2': ['CE549', 'CH525', 'CH425', 'CS577', 'ME501', 'ME525', 'PH604', 'HS233', 'HS201', 'HS231'],
        '3': ['CE571', 'CH521', 'CH427', 'CS555', 'EE512', 'MA521', 'ME313', 'ME504', 'PH525', 'PH427', 'PH704', 'CB407'],
        '4': ['CB203', 'CE547', 'CH601', 'CH423', 'CS555', 'EE370', 'EE540', 'MA535', 'MH503', 'PH427', 'PH702', 'CB401'],
        '5': ['EE525', 'EE523', 'MA539', 'PH421', 'PH523', 'CB301', 'MA201'],
        '6': ['CS571', 'CS561'],
    },
    "wed": {
        '8': [],
        '9': ['CE319', 'EE201', 'EE570', 'MA426', 'ME315', 'ME537', 'MM501'],
        '10': ['CE317', 'EE200', 'EE350', 'EE511', 'EE530', 'MA427', 'ME207', 'ME533', 'ME331', 'PH423', 'PH521', 'CS501', 'CS206', 'CS321', 'CB305', 'MM503', 'MM205'],
        '11': ['CB503', 'CB205', 'CE203', 'CE303', 'CE505', 'CH429', 'CS544', 'EE330', 'MA523', 'MA429', 'ME431', 'PH429', 'CB303', 'CS204', 'CS303', 'MM203'],
        '12': ['CB501', 'CH421', 'CH605', 'MA521', 'MA503', 'MA421', 'PH401', 'PH403', 'ME335', 'PH301', 'MA201', 'HS231', 'HS552', 'MA501'],
        '1': [],
        '2': ['CE517', 'CS577', 'MA529', 'ME503', 'PH525', 'PH427', 'HS233', 'HS201', 'HS221'],
        '3': ['CE213', 'CE517', 'CS322', 'EE512', 'EE525', 'ME313', 'ME504', 'MM511'],
        '4': ['CB307', 'CS322', 'HS451', 'HS531', 'MH503', 'MM511'],
        '5': ['CS384', 'CS322', 'HS451', 'PH421', 'PH523'],
        '6': ['CS571', 'CS384', 'CS561'],
    },
    "thu": {
        '8': [],
        '9': ['CE321', 'EE221', 'EE381', 'MA527', 'ME313', 'ME742', 'PH701'],
        '10': ['CB203', 'CE317', 'EE200', 'EE468', 'EE523', 'MA427', 'MH501', 'ME521', 'ME525', 'PH521', 'CS501', 'MM201'],
        '11': ['CB205', 'CE211', 'CE303', 'CE545', 'CH429', 'CS555', 'EE511', 'EE330', 'MA525', 'MA426', 'ME537', 'PH425', 'PH608', 'CS354', 'MM201'],
        '12': ['CB503', 'CH605', 'CS547', 'EE534', 'MA535', 'MA421', 'CS303', 'MM511'],
        '1': [],
        '2': ['CB303', 'CH523', 'CS564', 'PH604', 'PH704', 'MM505'],
        '3': ['CH425', 'CH601', 'CS205', 'CS355', 'CS559', 'EE512', 'EE525', 'MA429', 'ME393', 'ME504', 'ME209', 'PH427', 'PH525', 'CB407'],
        '4': ['CB211', 'CE547', 'CH525', 'CH423', 'CS205', 'CS355', 'CS559', 'EE507', 'MA425', 'ME231', 'ME503', 'PH702', 'PH502', 'CB401'],
        '5': ['CB211', 'CS205', 'CS355', 'CS559', 'HS531', 'MA539', 'PH421', 'PH523', 'CB301'],
        '6': [],
    },
    "fri": {
        '8': [],
        '9': ['CE321', 'EE221', 'EE570', 'ME207', 'ME533', 'ME315', 'MM501'],
        '10': ['CE213', 'CE217', 'CE517', 'CS564', 'EE201', 'EE350', 'EE511', 'MA527', 'MA429', 'ME207', 'ME331', 'ME742', 'PH423', 'CB305', 'MM523', 'MM201'],
        '11': ['CE571', 'CH421', 'CS544', 'EE486', 'EE530', 'MA529', 'MA425', 'ME431', 'PH425', 'CB209', 'CB301', 'MM505', 'MM203'],
        '12': ['CB503', 'CH427', 'EE532', 'HS531', 'MA427', 'CS303', 'MM505', 'CS541'],
        '1': ['CS541+_0-5_'],
        '2': ['CE549', 'CH601', 'CS564', 'PH429'],
        '3': ['CB307', 'CE491', 'CE507', 'CH523', 'CS571', 'CS303', 'CS206', 'EE370', 'EE523', 'ME501'],
        '4': ['CB307', 'CE507', 'CE491', 'CH423', 'CH521', 'CS571', 'CS206', 'CS303', 'EE540', 'MC594', 'ME231', 'PH502'],
        '5': ['CB307', 'CE491', 'CE507', 'CS571', 'MC594'],
        '6': [],
    },
    "sat": {
        '8': [],
        '9': [],
        '10': [],
        '11': [],
        '12': [],
        '1': [],
        '2': [],
        '3': [],
        '4': [],
        '5': [],
        '6': [],
    },
}












const COURSE_NAMES= {
    CS541: {
        name: `Foundations of Computer systems`,
        teacher_name: `Dr. Suman Kumar Maji`,
        teacher_email: `smaji@iitp.ac.in`,
    },
    MA501: {
        name: `Probablity Statistics and Stochastic process`,
        teacher_name: `Dr.  Yogesh Mani Tripathi`,
        teacher_email: `yogesh@iitp.ac.in`,
    },
    HS513: {
        name:`Humanities & Social science`,
        teacher_name: `Dr. Smriti Singh`,
        teacher_email: `smriti@iitp.ac.in`,
    },
    CS559: {
        name: `Computer systems lab - 1`,
        teacher_name: `Dr. Suman Kumar Maji`,
        teacher_email: `smaji@iitp.ac.in`,
    },
    CS544: {
        name: `Introduction to Network science`,
        teacher_name: `Dr. Joydeep Chandra`,
        teacher_email: `joydeep@iitp.ac.in`,
    },
    CS547: {
        name: `Foundation of Computer security`,
        teacher_name: `Dr. Somanath Tripathy`,
        teacher_email: `som@iitp.ac.in`,
    },
    CS555: {
        name: `Big data computing`,
        teacher_name: `Dr. Rajiv Misra`,
        teacher_email: `rajivm@iitp.ac.in`,
    },
    CS561: {
        name: `Artificial Intelligence`,
        teacher_name: `Dr. Asif Ekbal`,
        teacher_email: `asif@iitp.ac.in`,
    },
    CS571: {
        name: `Artificial Intelligence & Lab`,
        teacher_name: `Dr. Asif Ekbal`,
        teacher_email: `asif@iitp.ac.in`,
    },
    CS564: {
        name: `Foundation of Machine Learning`,
        teacher_name: `Dr. Sriparna Saha`,
        teacher_email: `sriparna@iitp.ac.in`,
    },
    CS577: {
        name: `Introduction to Blockchain and Cryptocurrency`,
        teacher_name: `Dr. Raju Halder`,
        teacher_email: `halder@iitp.ac.in`,
    },
}