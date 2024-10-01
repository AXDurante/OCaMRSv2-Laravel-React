import React from "react";
import {
    Page,
    Text,
    Document,
    StyleSheet,
    View,
    Font,
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
    src: "/fonts/ARIAL.ttf",
});
Font.register({
    family: "Arial",
    src: "/fonts/ARIALBD 1.ttf", // Register the bold font
    fontWeight: "bold",
});

// Create styles for common elements
const styles = StyleSheet.create({
    textStyle: {
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
        flex: 1,
        marginLeft: 5,
    },
    boxPR: {
        border: 1.8,
        width: "100%",
        height: "70",
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

const TSRpdf = () => {
    return (
        <Document>
            <Page size={[8.5 * 72, 13 * 72]}>
                {" "}
                {/* 1 inch = 72 points */}
                {/* Header Texts */}
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 15,
                        fontFamily: "Georgia",
                        marginTop: 30,
                    }}
                >
                    U&nbsp;N&nbsp;I&nbsp;V&nbsp;E&nbsp;R&nbsp;S&nbsp;I&nbsp;T&nbsp;Y&nbsp;&nbsp;O&nbsp;F&nbsp;&nbsp;S&nbsp;A&nbsp;N&nbsp;T&nbsp;O&nbsp;&nbsp;T&nbsp;O&nbsp;M&nbsp;A&nbsp;S
                </Text>
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 12,
                        fontFamily: "Cambria Math",
                    }}
                >
                    LABORATORY EQUIPMENT AND SUPPLIES OFFICE
                </Text>
                <Text
                    style={{ textAlign: "center", fontSize: 12, marginTop: 30 }}
                >
                    INSTRUMENTATION SERVICE CENTER
                </Text>
                <Text
                    style={{ textAlign: "center", fontSize: 12, marginTop: 10 }}
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
                    }}
                >
                    TSR No.
                </Text>
                <Text
                    style={{
                        textAlign: "right",
                        fontSize: 12,
                        marginRight: 110,
                    }}
                >
                    (To be filled by LESO)
                </Text>
                {/* Form Fields */}
                <View style={{ margin: "0px 60px 0px 60px", marginTop: 20 }}>
                    {/* Row 1 */}
                    <View style={styles.container}>
                        <View style={styles.leftSection}>
                            <Text style={styles.textStyle}>LABORATORY:</Text>
                            <Text style={styles.underlineFull} />
                        </View>
                        <View style={styles.rightSection}>
                            <Text style={styles.textStyle}>Date:</Text>
                            <Text style={styles.underlineFull} />
                        </View>
                    </View>

                    {/* Row 2 */}
                    <View style={styles.container}>
                        <View style={styles.leftSection}>
                            <Text style={styles.textStyle}>LAB LOCATION:</Text>
                            <Text style={styles.underlineFull} />
                        </View>
                        <View style={styles.rightSection}>
                            <Text style={styles.textStyle}>Tel No:</Text>
                            <Text style={styles.underlineFull} />
                        </View>
                    </View>

                    {/* Row 3 */}
                    <View style={styles.container}>
                        <View style={styles.leftSection}>
                            <Text style={styles.textStyle}>INSTRUMENT:</Text>
                            <Text style={styles.underlineFull} />
                        </View>
                        <View style={styles.rightSection}>
                            <Text style={styles.textStyle}>MODEL:</Text>
                            <Text style={styles.underlineFull} />
                        </View>
                    </View>

                    {/* Row 4 */}
                    <View style={styles.container}>
                        <View style={styles.leftSection}>
                            <Text style={styles.textStyle}>SERIAL NO:</Text>
                            <Text style={styles.underlineFull} />
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
                    <View style={styles.boxPR}></View>

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
                    <View style={styles.boxDO}></View>

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
                    <View style={styles.boxAT}></View>
                    <Text
                        style={[
                            styles.alignLeft,
                            styles.textStyle,
                            { fontFamily: "Arial", fontWeight: "bold" },
                        ]}
                    >
                        RECOMMENDATION
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 5,
                            marginLeft: 10,
                        }}
                    >
                        <View
                            style={{
                                width: 10,
                                height: 10,
                                borderWidth: 1,
                                borderColor: "#000",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: 5,
                            }}
                        >
                            {/* Checkbox for "For Pull-out" */}
                        </View>
                        <Text style={styles.textStyle}>For Pull-out</Text>

                        <View
                            style={{
                                width: 10,
                                height: 10,
                                borderWidth: 1,
                                borderColor: "#000",
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: 20,
                                marginRight: 5,
                            }}
                        >
                            {/* Checkbox for "Forward to Supplier" */}
                        </View>
                        <Text style={styles.textStyle}>
                            Forward to Supplier (External Calibration)
                        </Text>

                        <View
                            style={{
                                width: 10,
                                height: 10,
                                borderWidth: 1,
                                borderColor: "#000",
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: 20,
                                marginRight: 5,
                            }}
                        >
                            {/* Checkbox for "For Repair" */}
                        </View>
                        <Text style={styles.textStyle}>For Repair</Text>

                        <View
                            style={{
                                width: 10,
                                height: 10,
                                borderWidth: 1,
                                borderColor: "#000",
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: 20,
                                marginRight: 5,
                            }}
                        >
                            {/* Checkbox for "For Repair" */}
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
                            },
                        ]}
                    >
                        REMARKS
                    </Text>
                    <View
                        style={{
                            borderBottomWidth: 2,
                            borderBottomColor: "black",
                            marginTop: 15,
                        }}
                    />
                    <View
                        style={{
                            borderBottomWidth: 2,
                            borderBottomColor: "black",
                            marginTop: 15,
                        }}
                    />
                    <Text
                        style={[
                            styles.alignLeft,
                            styles.textStyle,
                            {
                                fontFamily: "Arial",
                                fontWeight: "bold",
                                marginTop: 15,
                            },
                        ]}
                    >
                        SERVICE PERFORMED BY: ___________________________ Noted
                        by: ___________________________
                    </Text>
                    <Text style={[styles.alignLeft, styles.textStyle]}>
                        Instrumentation Technician / Date LESO Administrator /
                        Date
                    </Text>

                    <Text
                        style={[
                            styles.alignLeft,
                            styles.textStyle,
                            {
                                fontFamily: "Arial",
                                fontWeight: "bold",
                                marginTop: 15,
                            },
                        ]}
                    >
                        SERVICE ACKNOWLEDGEMENT:
                    </Text>
                    <Text style={[styles.alignLeft, styles.textStyle]}>
                        This is to acknowledge that the above service has been
                        performed and completed in our laboratory/office.
                    </Text>

                    <Text
                        style={[
                            styles.alignLeft,
                            styles.textStyle,
                            { fontFamily: "Arial", fontWeight: "bold" },
                        ]}
                    >
                        REQUESTED BY:
                    </Text>
                    <Text style={[styles.alignLeft, styles.textStyle]}>
                        REQUESTED BY:
                        ___________________________________________ E-mail:
                        ___________________________
                    </Text>
                    <Text style={[styles.alignLeft, styles.textStyle]}>
                        Signature over printed name / Date
                    </Text>

                    <Text
                        style={[
                            styles.alignLeft,
                            styles.textStyle,
                            { fontFamily: "Arial", fontWeight: "bold" },
                        ]}
                    >
                        POSITION:
                    </Text>
                    <Text style={[styles.alignLeft, styles.textStyle]}>
                        POSITION:
                        _______________________________________________
                    </Text>

                    <Text style={[styles.alignRight, styles.textStyle]}>
                        UST:S022-00-FO34 rev01 05/02/23
                    </Text>
                </View>
                <View style={[styles.mL50, styles.alignLeft]}>
                    <Text style={{ fontSize: 8 }}>
                        {" "}
                        {/* Set font size to 8 */}
                        8/F UST Central Laboratory Building, España Boulevard,
                        Sampaloc, Manila, 1015 Philippines
                    </Text>
                    <Text style={{ fontSize: 8 }}>
                        {" "}
                        {/* Set font size to 8 */}
                        Tel. No: +632-8712-6349;+632-3406-1611 local 8266
                    </Text>
                    <Text style={{ fontSize: 8 }}>
                        {" "}
                        {/* Set font size to 8 */}
                        Email address: leso@ust.edu.ph
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default TSRpdf;
