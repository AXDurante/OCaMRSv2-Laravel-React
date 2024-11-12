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
    family: "ArialBold",
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
    // ... existing styles ...
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
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
    alignRight: {
        textAlign: "right",
    },
    underlineFull: {
        borderBottomWidth: 1,
        flex: 1,
        marginLeft: 5,
    },
    rightSection: {
        width: "25%",
        flexDirection: "row",
        alignItems: "center",
    },
    tableContainer: {
        marginTop: 20,
    },
    tableHeader: {
        flexDirection: "row",
        alignItems: "center",
        height: 20, // Adjust height for the header as needed
        backgroundColor: "#d9d9d9", // Background color for the header
        textAlign: "center",
        fontSize: 12,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#000", // Unified border color
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    tableRow: {
        flexDirection: "row",
        alignItems: "center", // Ensure vertical alignment
        justifyContent: "center", // Ensure horizontal alignment
        height: 20, // Adjust height as needed
        textAlign: "center",
        fontSize: 11,
        borderBottomWidth: 1,
        borderColor: "#000", // Border for rows
        borderLeftWidth: 1, // Ensure left border is present
        borderRightWidth: 1, // Ensure right border is present
        backgroundColor: "#FFF2CC",
        justifyContent: "center", // Ensure content is centered
        display: "flex", // Use flex for the column to apply centering
    },
    tableRow1: {
        flexDirection: "row",
        alignItems: "center", // Ensure vertical alignment
        justifyContent: "center", // Ensure horizontal alignment
        height: 20, // Adjust height as needed
        textAlign: "center",
        fontSize: 11,
        borderBottomWidth: 1,
        borderColor: "#000", // Border for rows
        borderLeftWidth: 1, // Ensure left border is present
        borderRightWidth: 1, // Ensure right border is present
        backgroundColor: "#FFF2CC",
        justifyContent: "center", // Ensure content is centered
        display: "flex", // Use flex for the column to apply centering
    },
    tableColHeader1: {
        width: "50%",
        height: "100%",

        paddingVertical: 4,
        borderRightWidth: 1,
        borderRightColor: "#000",
        backgroundColor: "#FFF2CC",
    },
    tableTopBorder: {
        borderTopWidth: 1,
    },
    tableTopBorder2: {
        borderTopWidth: 1,
    },
    tableCol1right: {
        width: "80%",
        height: "100%",
        textAlign: "center",
        fontFamily: "ArialBold",
        fontSize: 9,

        paddingVertical: 4,
        borderRightWidth: 1, // Ensure right border is present
        borderColor: "#000", // Ensure border color is consistent
        justifyContent: "center", // Ensure horizontal alignment
        alignItems: "center", // Ensure vertical alignment
        textAlign: "center",
    },
    tableCol1: {
        width: "50%",
        height: "100%",
        textAlign: "center",
        fontFamily: "ArialBold",
        fontSize: 9,

        paddingVertical: 4,
        borderRightWidth: 1, // Ensure right border is present
        borderColor: "#000", // Ensure border color is consistent
        justifyContent: "center", // Ensure horizontal alignment
        alignItems: "center", // Ensure vertical alignment
        textAlign: "left",
    },
    tableText1: {
        width: "25%",
        height: "100%",
        textAlign: "center",
        fontFamily: "ArialBold",
        fontSize: 9,

        paddingVertical: 4,
        borderRightWidth: 1, // Ensure right border is present
        borderColor: "#000", // Ensure border color is consistent
        justifyContent: "center",
        backgroundColor: "#FFF2CC",
        textAlign: "center",
        alignItems: "center", // Ensure vertical alignment
    },
    tableText3: {
        width: "33.33%",
        height: "100%",
        textAlign: "center",
        fontFamily: "ArialBold",
        fontSize: 9,
        backgroundColor: "#ffffff",
        paddingVertical: 4,
        borderRightWidth: 1, // Ensure right border is present
        borderColor: "#000", // Ensure border color is consistent
        justifyContent: "center",

        textAlign: "center",
        alignItems: "center", // Ensure vertical alignment
    },
    tableHeader3: {
        flexDirection: "row",
        alignItems: "center",
        height: 20, // Adjust height for the header as needed
        backgroundColor: "#d9d9d9", // Background color for the header
        textAlign: "center",
        fontSize: 12,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#000", // Unified border color
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    tableColHeader2: {
        width: "25%",
        height: "100%",
        textAlign: "center",

        fontWeight: "bold",
        fontSize: 9,
        paddingVertical: 4,
        borderRightWidth: 1,
        borderRightColor: "#000",
        backgroundColor: "#FFF2CC",
    },
    tableCol2: {
        width: "33.33%", // Adjust width for three columns
        height: "100%",
        textAlign: "center",
        fontFamily: "ArialBold",
        fontSize: 9,
        paddingVertical: 4,
        borderRightWidth: 1, // Ensure right border is present
        borderColor: "#000", // Ensure border color is consistent
        justifyContent: "center", // Ensure horizontal alignment
        alignItems: "center", // Ensure vertical alignment
    },
    tableColHeader3: {
        width: "33.33%",
        height: "100%",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 12,
        paddingVertical: 4,
        borderRightWidth: 1,
        borderRightColor: "#000",
        backgroundColor: "#ffffff",
    },
    tableCol3: {
        width: "33.33%",
        height: "100%",
        textAlign: "center",
        fontSize: 11,
        paddingVertical: 4,
        borderRightWidth: 1, // Ensure right border is present
        borderColor: "#000", // Ensure border color is consistent
        justifyContent: "center", // Ensure horizontal alignment
        alignItems: "center", // Ensure vertical alignment
        backgroundColor: "#ffffff",
    },
    lastCol: {
        borderRightWidth: 0, // No border for the last column
    },
    calibrationContainer: {
        border: "1px solid black", // Border around the container
        width: "100%",
        height: "60",
        padding: 8,
    },
    remarksContainer: {
        border: "1px solid black", // Border around the container
        width: "100%",
        height: "80",
    },
    remarksText: {
        textAlign: "left",
        padding: 8,
        fontSize: 11,
    },
    resultsContainer: {
        border: "1px solid black", // Border around the container
        width: "100%",
        height: "80",
    },
    calibrationHeader: {
        fontFamily: "ArialBold",
        fontSize: 12, // Font size for the header
        marginBottom: 5, // Space below the header
        marginTop: 10,
    },
    calibrationText: {
        textAlign: "left",
        padding: 8,
        fontSize: 11, // Font size for the text
        lineHeight: 1.5, // Line height for better readability
    },
});

function breakLongWords(text) {
    return text.replace(/(\S{92})/g, "$1\n"); // Inserts a newline every 30 characters
}

function COCpdf ({tsr, cocDetails}) {
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
                    style={{
                        textAlign: "center",
                        fontSize: 12,
                        marginTop: 15,
                        fontFamily: "ArialBold",
                    }}
                >
                    CERTIFICATE OF CALIBRATION
                </Text>

                <View
                    style={{
                        marginLeft: 60,
                        marginRight: 60,
                    }}
                >
                    <View style={styles.tableContainer}>
                        {/* Table Header */}
                        <View style={styles.tableTopBorder}>
                            <View style={[styles.tableRow]}>
                                {" "}
                                {/* Use tableRow for the header as well */}
                                <Text style={styles.tableCol1}>
                                    Calibration Certificate No.
                                </Text>
                                <Text
                                    style={[
                                        styles.tableCol1right,
                                        styles.lastCol,
                                    ]} // Ensure this is consistent with styles
                                >{cocDetails.coc_num}</Text>
                            </View>
                        </View>
                        {/* Table Rows */}
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCol1}>
                                Laboratory (College / Department)
                            </Text>
                            <Text
                                style={[styles.tableCol1right, styles.lastCol]}
                            >{cocDetails.college}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCol1}>
                                Laboratory Location
                            </Text>
                            <Text
                                style={[styles.tableCol1right, styles.lastCol]}
                            >{cocDetails.lab_loc}</Text>
                        </View>
                    </View>
                    {/* Second Table (4 columns, 5 rows) */}
                    <View style={styles.tableContainer}>
                        {/* Table Header */}
                        <View style={styles.tableTopBorder2}>
                            <View style={styles.tableRow1}>
                                <Text style={styles.tableText1}>Equipment</Text>
                                <Text style={[styles.tableColHeader2]}>{cocDetails.equipment}</Text>
                                <Text style={styles.tableText1}>
                                    Date Received
                                </Text>
                                <Text
                                    style={[
                                        styles.tableColHeader2,
                                        styles.lastCol,
                                    ]}
                                >{cocDetails.date_req}</Text>
                            </View>
                        </View>

                        {/* Table Rows */}
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCol2}>Manufacturer</Text>
                            <Text style={styles.tableCol2}>{cocDetails.manufacturer}</Text>
                            <Text style={styles.tableCol2}>
                                Date Calibrated
                            </Text>
                            <Text
                                style={[styles.tableCol2, styles.lastCol]}
                            >{cocDetails.date_cal}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCol2}>Model No.</Text>
                            <Text style={styles.tableCol2}>{cocDetails.model}</Text>
                            <Text style={styles.tableCol2}>
                                Recommended Due Date
                            </Text>
                            <Text
                                style={[styles.tableCol2, styles.lastCol]}
                            >{cocDetails.date_due}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCol2}>Serial No.</Text>
                            <Text style={styles.tableCol2}>{cocDetails.serial_num}</Text>
                            <Text style={styles.tableCol2}>
                                Place of Calibration
                            </Text>
                            <Text
                                style={[styles.tableCol2, styles.lastCol]}
                            > UST LESO Office </Text>
                        </View>
                    </View>

                    <Text
                        style={[
                            styles.calibrationHeader,
                            { textDecoration: "underline" },
                        ]}
                    >
                        Calibration Procedure and Traceability:
                    </Text>
                    <View style={styles.calibrationContainer}>
                        <Text
                            style={[
                                styles.calibrationText,
                                { textAlign: "left" },
                            ]}
                        >
                            {breakLongWords(cocDetails.calibration)}
                        </Text>
                    </View>
                    <View style={styles.tableContainer}>
                        {/* Table Header */}
                        <View style={styles.tableTopBorder}></View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableText3}>Standard Used</Text>
                            <Text style={styles.tableText3}>
                                Calibration Certificate No.
                            </Text>
                            <Text style={[styles.tableText3, styles.lastCol]}>
                                Issuing Laboratory
                            </Text>
                        </View>

                        {/* Row 1 */}
                        <View style={styles.tableRow}>
                            <Text style={styles.tableText3}>{cocDetails.standard}</Text>
                            <Text style={styles.tableText3}>{cocDetails.coc_num}</Text>
                            <Text
                                style={[styles.tableText3, styles.lastCol]}
                            >{cocDetails.labLocation}</Text>
                        </View>
                    </View>

                    <Text
                        style={[
                            styles.calibrationHeader,
                            { textDecoration: "underline" },
                        ]}
                    >
                        Calibration Results:
                    </Text>
                    <View style={styles.resultsContainer}>
                        <Text style={styles.calibrationText}>
                            {breakLongWords(cocDetails.calibration_res)}
                        </Text>
                    </View>

                    <Text
                        style={[
                            styles.calibrationHeader,
                            { textDecoration: "underline" },
                        ]}
                    >
                        Remarks:
                    </Text>
                    <View style={styles.remarksContainer}>
                        <Text style={styles.remarksText}>
                            {breakLongWords(cocDetails.remark)}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 40,
                        }}
                    >
                        <View style={{ width: "45%" }}>
                            <Text style={{ fontSize: 11, fontWeight: "bold" }}>
                                CALIBRATED BY:
                            </Text>
                            {cocDetails.tech_photo && (
                                <>
                                    <Image
                                        src={cocDetails.tech_photo}
                                        style={{
                                            width: 75,
                                            height: 75,
                                            top: -5,
                                            left: 60,
                                            zIndex: 1,
                                            position: 'absolute',
                                        }}
                                    />
                                    <Text style={{ 
                                        fontSize: 12,
                                        position: 'absolute',
                                        top: 25,
                                        left: 60
                                    }}>
                                        {cocDetails.tech_id}
                                    </Text>
                                </>
                            )}
                            <View style={{
                                borderBottomWidth: 1,
                                marginVertical: 5,
                                marginTop: 25,
                            }} />
                            <Text style={{ fontSize: 11 }}>
                                Instrumentation Technician / Date
                            </Text>
                        </View>
                        <View style={{ width: "45%" }}>
                            <Text style={{ fontSize: 11, fontWeight: "bold" }}>
                                NOTED BY:
                            </Text>
                            {cocDetails.admin_signature && (
                                <>
                                    <Image
                                        src={cocDetails.admin_signature}
                                        style={{
                                            width: 75,
                                            height: 75,
                                            top: -5,
                                            left: 60,
                                            zIndex: 1,
                                            position: 'absolute',
                                        }}
                                    />
                                    <Text style={{ 
                                        fontSize: 12,
                                        position: 'absolute',
                                        top: 25,
                                        left: 60
                                    }}>
                                        {cocDetails.admin_name}
                                    </Text>
                                </>
                            )}
                            <View style={{
                                borderBottomWidth: 1,
                                marginVertical: 5,
                                marginTop: 25,
                            }} />
                            <Text style={{ fontSize: 11 }}>
                                LESO Administrator / Date
                            </Text>
                        </View>
                    </View>
                </View>

                <Text
                    style={[
                        styles.alignRight,
                        styles.textStyle,
                        {
                            marginTop: 30,
                            fontFamily: "Arial",
                            fontStyle: "italic",
                            fontSize: 12,
                            marginRight: 50,
                        },
                    ]}
                >
                    UST:S022-00-FO34 rev01 05/02/23
                </Text>

                <Image
                    src="/images/COCFooter.png"
                    style={[styles.logo, { width: "100%", height: "auto" }]} // Updated to full width
                />
            </Page>
        </Document>
    );
};

export default COCpdf;
