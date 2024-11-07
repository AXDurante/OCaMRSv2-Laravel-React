import React from "react";
import {
    Page,
    Text,
    Document,
    StyleSheet,
    View,
    Font,
    Image,
} from "@react-pdf/renderer";

// Register fonts
Font.register({
    family: "Georgia",
    src: "/fonts/georgia.ttf",
});
Font.register({
    family: "Cambria Math",
    src: "/fonts/cambria-math.ttf",
});
Font.register({
    family: "Arial",
    src: "/fonts/ARIAL.TTF",
});
Font.register({
    family: "Arial",
    src: "/fonts/ARIALBD 1.TTF",
    fontWeight: "bold",
});
Font.register({
    family: "Arial",
    src: "/fonts/ARIALI.TTF",
    fontStyle: "italic",
});

// Create styles for common elements
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
    },
    headerText: {
        textAlign: "center",
        fontSize: 15,
        fontFamily: "Georgia",
        marginTop: 10,
    },
    subHeaderText: {
        textAlign: "center",
        fontSize: 12,
        fontFamily: "Cambria Math",
        marginTop: 0, // Set marginTop to 0
    },
    logo: {
        width: 70,
        height: 70,
    },
    textStyle: {
        fontSize: 9,
    },
    valueText: {
        fontSize: 9,
    },
    underline: {
        borderBottomWidth: 1,
        flex: 1,
        marginLeft: 5,
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    leftSection: {
        width: "65%",
        flexDirection: "row",
        alignItems: "center",
    },
    rightSection: {
        width: "25%",
        flexDirection: "row",
        alignItems: "center",
    },
    underlineFull: {
        borderBottomWidth: 1,
        borderBottomColor: "black",
        flex: 1, // This makes the underline stretch fully
        marginLeft: 5, // Adjust the space between the text and underline
    },

    boxPR: {
        border: 1.8,
        width: "100%",
        height: "70",
        padding: "5",
    },

    boxDO: {
        border: 1.8,
        width: "100%",
        height: "90",
    },

    boxAT: {
        border: 1.8,
        width: "100%",
        height: "100",
    },
    alignLeft: {
        textAlign: "left",
    },
    alignRight: {
        textAlign: "right",
    },
    mt15: {
        marginTop: 15,
    },
    mL50: {
        marginLeft: 50,
    },
});
function breakLongWords(text) {
    return text.replace(/(\S{92})/g, "$1\n"); // Inserts a newline every 30 characters
}

function TSRpdf({ jobOrder, reportDetails }) {
    return (
        <Document>
            <Page size={[8.5 * 72, 13 * 72]}>
                <View style={styles.headerContainer}>
                    <Image
                        src="/images/UstLogo.png"
                        style={[styles.logo, { marginLeft: 50 }]}
                    />
                    <View
                        style={{
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Text style={styles.headerText}>
                            U&nbsp;N&nbsp;I&nbsp;V&nbsp;E&nbsp;R&nbsp;S&nbsp;I&nbsp;T&nbsp;Y&nbsp;
                            &nbsp;O&nbsp;F&nbsp;
                            &nbsp;S&nbsp;A&nbsp;N&nbsp;T&nbsp;O&nbsp;
                            &nbsp;T&nbsp;O&nbsp;M&nbsp;A&nbsp;S
                        </Text>
                        <Text style={styles.subHeaderText}>
                            LABORATORY EQUIPMENT AND SUPPLIES OFFICE
                        </Text>
                    </View>
                    <Image
                        src="/images/LesoLogo.jpg"
                        style={[styles.logo, { marginRight: 50 }]}
                    />
                </View>

                <Text
                    style={{ textAlign: "center", fontSize: 12, marginTop: 10 }}
                >
                    INSTRUMENTATION SERVICE CENTER
                </Text>
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 12,
                        marginTop: 15,
                        fontFamily: "Arial",
                        fontWeight: "bold",
                    }}
                >
                    TECHNICAL SERVICE REPORT
                </Text>
                {/* TSR No. */}
                <Text
                    style={{
                        textAlign: "right",
                        fontSize: 12,
                        marginTop: 10,
                        marginRight: 150,
                        fontFamily: "Arial",
                        fontWeight: "bold",
                    }}
                >
                    TSR No. {reportDetails.tsrNum}
                </Text>
                <Text
                    style={{
                        textAlign: "right",
                        fontSize: 9,
                        marginRight: 130,
                        fontFamily: "Arial",
                        fontStyle: "italic",
                    }}
                >
                    (To be filled by LESO)
                </Text>
                {/* Form Fields */}
                <View style={{ margin: "0px 60px 0px 60px", marginTop: 20 }}>
                    {/* Row 1 - LABORATORY and Date */}
                    <View style={styles.container}>
                        <View style={{ flexDirection: "row", width: "65%" }}>
                            <Text style={styles.textStyle}>LABORATORY: </Text>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    borderBottomWidth: 1,
                                    borderBottomColor: "black",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={styles.valueText}>
                                    {jobOrder.lab}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", width: "25%" }}>
                            <Text style={styles.textStyle}>Date:</Text>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    borderBottomWidth: 1,
                                    borderBottomColor: "black",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={styles.valueText}>
                                    {jobOrder.date_request}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Row 2 - LAB LOCATION and Tel No */}
                    <View style={styles.container}>
                        <View style={{ flexDirection: "row", width: "65%" }}>
                            <Text style={styles.textStyle}>LAB LOCATION: </Text>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    borderBottomWidth: 1,
                                    borderBottomColor: "black",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={styles.valueText}>
                                    {jobOrder.lab_loc}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", width: "25%" }}>
                            <Text style={styles.textStyle}>Tel No:</Text>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    borderBottomWidth: 1,
                                    borderBottomColor: "black",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={styles.valueText}>
                                    {jobOrder.user.phoneNumber}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Row 3 */}
                    <View style={styles.container}>
                        <View style={styles.leftSection}>
                            <Text style={styles.textStyle}>INSTRUMENT: </Text>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    borderBottomWidth: 1,
                                    borderBottomColor: "black",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={styles.valueText}>
                                    {reportDetails.instrument}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.rightSection}>
                            <Text style={styles.textStyle}>MODEL:</Text>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    borderBottomWidth: 1,
                                    borderBottomColor: "black",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={styles.valueText}>
                                    {reportDetails.model}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Row 4 */}
                    <View style={styles.container}>
                        <View style={styles.leftSection}>
                            <Text style={styles.textStyle}>SERIAL NO:</Text>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    borderBottomWidth: 1,
                                    borderBottomColor: "black",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={styles.valueText}>
                                    {reportDetails.serialNo}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.rightSection}>
                            <Text style={styles.textStyle}></Text>
                        </View>
                    </View>

                    <Text
                        style={[
                            styles.alignLeft,
                            styles.textStyle,
                            {
                                fontFamily: "Arial",
                                fontWeight: "bold",
                                marginTop: 15,
                                marginBottom: 3,
                                marginLeft: 3,
                            },
                        ]}
                    >
                        PROBLEM REPORTED
                    </Text>
                    <View style={styles.boxPR}>
                        <Text style={{ padding: 5, fontSize: 9 }}>
                            {breakLongWords(reportDetails.problemReported)}
                        </Text>
                    </View>

                    <Text
                        style={[
                            styles.alignLeft,
                            styles.textStyle,
                            {
                                fontFamily: "Arial",
                                fontWeight: "bold",
                                marginTop: 10,
                                marginBottom: 3,
                                marginLeft: 3,
                            },
                        ]}
                    >
                        DIAGNOSIS/OBSERVATION
                    </Text>
                    <View style={styles.boxDO}>
                        <Text style={{ padding: 5, fontSize: 9 }}>
                            {breakLongWords(reportDetails.diagnosis)}
                        </Text>
                    </View>

                    <Text
                        style={[
                            styles.alignLeft,
                            styles.textStyle,
                            {
                                fontFamily: "Arial",
                                fontWeight: "bold",
                                marginTop: 10,
                                marginBottom: 3,
                                marginLeft: 3,
                            },
                        ]}
                    >
                        ACTION TAKEN
                    </Text>
                    <View style={styles.boxAT}>
                        <Text style={{ padding: 5, fontSize: 9 }}>
                            {breakLongWords(reportDetails.actionTaken)}
                        </Text>
                    </View>
                    <Text
                        style={[
                            styles.alignLeft,
                            styles.textStyle,
                            {
                                fontFamily: "Arial",
                                fontWeight: "bold",
                                marginTop: 10,
                                marginBottom: 3,
                                marginLeft: 3,
                            },
                        ]}
                    >
                        RECOMMENDATION
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                        <View style={{
                            width: 10,
                            height: 10,
                            borderWidth: 1,
                            borderColor: "#000",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: 10,
                            marginLeft: 5,
                            backgroundColor: reportDetails.recommendation === "For Pull-Out" ? "#000" : "#fff"
                        }}>
                        </View>
                        <Text style={styles.textStyle}>For Pull-out</Text>

                        <View style={{
                            width: 10,
                            height: 10,
                            borderWidth: 1,
                            borderColor: "#000",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: 20,
                            marginRight: 5,
                            backgroundColor: reportDetails.recommendation === "Forward to Supplier" ? "#000" : "#fff"
                        }}>
                        </View>
                        <Text style={styles.textStyle}>Forward to Supplier (External Calibration)</Text>

                        <View style={{
                            width: 10,
                            height: 10,
                            borderWidth: 1,
                            borderColor: "#000",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: 20,
                            marginRight: 5,
                            backgroundColor: reportDetails.recommendation === "For Repair" ? "#000" : "#fff"
                        }}>
                        </View>
                        <Text style={styles.textStyle}>For Repair</Text>

                        <View style={{
                            width: 10,
                            height: 10,
                            borderWidth: 1,
                            borderColor: "#000",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: 20,
                            marginRight: 5,
                            backgroundColor: reportDetails.recommendation === "Beyond Repair" ? "#000" : "#fff"
                        }}>
                        </View>
                        <Text style={styles.textStyle}>Beyond Repair</Text>
                    </View>

                    <Text
                        style={[
                            styles.alignLeft,
                            styles.textStyle,
                            {
                                fontFamily: "Arial",
                                fontWeight: "bold",
                                marginTop: 15,
                                marginLeft: 9,
                            },
                        ]}
                    >
                        REMARKS 
                    </Text>
                    <View style={{ marginLeft: 9, marginRight: 9, marginTop: 5, minHeight: 40 }}>
                        <Text style={{ fontSize: 9, lineHeight: 15, paddingTop: 2, position: 'absolute', zIndex: 1 }}>
                            {breakLongWords(reportDetails.tsr_remarks)}
                        </Text>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: "black", marginTop: 15 }} />
                        <View style={{ borderBottomWidth: 1, borderBottomColor: "black", marginTop: 15 }} />
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 15,
                            marginLeft: 9,
                        }}
                    >
                        <View style={{ flexDirection: "column", flex: 1, position: 'relative' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text
                                    style={[
                                        styles.alignLeft,
                                        styles.textStyle,
                                        {
                                            fontFamily: "Arial",
                                            fontWeight: "bold",
                                        },
                                    ]}
                                >
                                    SERVICE PERFORMED BY:
                                </Text>
                                <View style={{ position: 'relative', flex: 1, marginLeft: 5 }}>
                                    <Text
                                        style={[
                                            styles.textStyle,
                                            { 
                                                position: 'absolute',
                                                top: -8,
                                                left: 5,
                                                zIndex: 1,
                                                marginTop: 5,
                                            },
                                        ]}
                                    >
                                        {reportDetails.tech_id}
                                    </Text>
                                    <View style={{ marginTop: 5.5, borderBottomWidth: 1, borderBottomColor: 'black', marginRight: 5 }} />
                                </View>
                            </View>
                            <Text
                                style={[
                                    styles.alignLeft,
                                    styles.textStyle,
                                    { marginLeft: 100 },
                                ]}
                            >
                                Instrumentation Technician / Date
                            </Text>
                        </View>
                        <View style={{ flexDirection: "column", flex: 1 }}>
                            <Text
                                style={[
                                    styles.alignLeft,
                                    styles.textStyle,
                                    {
                                        fontFamily: "Arial",
                                        fontWeight: "bold",
                                        marginLeft: 20,
                                    },
                                ]}
                            >
                                Noted by: ________________________
                            </Text>
                            <Text
                                style={[
                                    styles.alignLeft,
                                    styles.textStyle,
                                    { marginLeft: 90 },
                                ]}
                            >
                                LESO Administrator / Date
                            </Text>
                        </View>
                    </View>

                    <Text
                        style={[
                            styles.alignLeft,
                            styles.textStyle,
                            {
                                fontFamily: "Arial",
                                fontWeight: "bold",
                                marginTop: 15,
                                marginLeft: 9,
                            },
                        ]}
                    >
                        SERVICE ACKNOWLEDGEMENT:
                    </Text>
                    <Text
                        style={[
                            styles.alignLeft,
                            styles.textStyle,
                            {
                                marginLeft: 9,
                                marginBottom: 9,
                                marginTop: 2,
                            },
                        ]}
                    >
                        This is to acknowledge that the above service has been
                        performed and completed in our laboratory/office.
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 2,
                        }}
                    >
                        <Text
                            style={[
                                styles.textStyle,
                                { fontFamily: "Arial", fontWeight: "bold" },
                            ]}
                        >
                            REQUESTED BY:
                            ___________________________________________
                        </Text>
                        <Text
                            style={[
                                styles.alignLeft,
                                styles.textStyle,
                                { marginLeft: 70 },
                            ]}
                        >
                            E-mail: __________________
                        </Text>
                    </View>

                    <Text
                        style={[
                            styles.alignLeft,
                            styles.textStyle,
                            { marginLeft: 90, marginTop: 2 },
                        ]}
                    >
                        Signature over printed name / Date
                    </Text>

                    <Text
                        style={[
                            styles.textStyle,
                            {
                                fontFamily: "Arial",
                                fontWeight: "bold",
                                marginTop: 4,
                            },
                        ]}
                    >
                        POSITION:
                        _______________________________________________
                    </Text>

                    <Text
                        style={[
                            styles.alignRight,
                            styles.textStyle,
                            {
                                marginbt: 30,
                                marginTop: 30,
                                fontFamily: "Arial",
                                fontStyle: "italic",
                            },
                        ]}
                    >
                        UST:S022-00-FO34 rev01 05/02/23
                    </Text>
                </View>
                <Image
                    src="/images/TSRFooter.png"
                    style={[
                        styles.logo,
                        { width: "100%", height: "auto", marginTop: 30 },
                    ]} // Updated to full width
                />
            </Page>
        </Document>
    );
}

export default TSRpdf;
