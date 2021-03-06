import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    ListRenderItem,
    Modal,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import { icons, images } from "../constants";
import { COLORS, FONTS, SIZES } from "../constants/theme";

interface Country {
    callingCode: string;
    code: string;
    flag: string;
    name: string;
}

type RootStackParamList = {
    Home: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Home"
>;

type Props = {
    navigation: ProfileScreenNavigationProp;
};

const SignUp = ({ navigation }: Props) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [areas, setAreas] = useState<any>([]);
    const [selectedArea, setSelectedArea] = useState<null | Country>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        fetch("http://restcountries.eu/rest/v2/all")
            .then((response) => response.json())
            .then((data) => {
                let areas = data.map(
                    (area: {
                        alpha2Code: any;
                        name: any;
                        callingCodes: any[];
                    }) => {
                        return {
                            code: area.alpha2Code,
                            name: area.name,
                            callingCode: `+${area.callingCodes[0]}`,
                            flag: `https://www.countryflags.io/${area.alpha2Code}/flat/64.png`,
                        };
                    }
                );

                setAreas(areas);

                if (areas.length > 0) {
                    let defaultArea = areas.filter(
                        (a: Country) => a.code === "US"
                    );
                    setSelectedArea(defaultArea[0]);
                }
            });
    }, []);

    const renderHeader = () => {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: SIZES.padding * 6,
                    paddingHorizontal: SIZES.padding * 2,
                }}
            >
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    style={{ width: 20, height: 20, tintColor: COLORS.white }}
                ></Image>
                <Text
                    style={{
                        marginLeft: SIZES.padding * 1.5,
                        color: COLORS.white,
                        ...FONTS.h4,
                    }}
                >
                    Sign Up
                </Text>
            </TouchableOpacity>
        );
    };

    const renderLogo = () => {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 3,
                    height: 100,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image
                    source={images.wallieLogo}
                    resizeMode="contain"
                    style={{ width: "60%" }}
                ></Image>
            </View>
        );
    };

    const renderForm = () => {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 3,
                    marginHorizontal: SIZES.padding * 3,
                }}
            >
                {/* Full Name */}
                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
                        Full Name
                    </Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3,
                        }}
                        placeholder="Enter Full Name"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                    ></TextInput>
                </View>

                {/* Phone Number */}
                <View style={{ marginTop: SIZES.padding * 2 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
                        Phone Number
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                            style={{
                                width: 100,
                                height: 50,
                                marginHorizontal: 5,
                                borderBottomColor: COLORS.white,
                                borderBottomWidth: 1,
                                flexDirection: "row",
                                ...FONTS.body2,
                            }}
                            onPress={() => setModalVisible(true)}
                        >
                            <View style={{ justifyContent: "center" }}>
                                <Image
                                    source={icons.down}
                                    style={{
                                        width: 10,
                                        height: 10,
                                        tintColor: COLORS.white,
                                    }}
                                ></Image>
                            </View>
                            <View
                                style={{
                                    justifyContent: "center",
                                    marginLeft: 5,
                                }}
                            >
                                <Image
                                    source={{ uri: selectedArea?.flag }}
                                    resizeMode="contain"
                                    style={{ width: 30, height: 30 }}
                                ></Image>
                            </View>
                            <View
                                style={{
                                    justifyContent: "center",
                                    marginLeft: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        color: COLORS.white,
                                        ...FONTS.body3,
                                    }}
                                >
                                    {selectedArea?.callingCode}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TextInput
                            keyboardType="numeric"
                            style={{
                                flex: 1,
                                marginVertical: SIZES.padding,
                                borderBottomColor: COLORS.white,
                                borderBottomWidth: 1,
                                height: 40,
                                color: COLORS.white,
                                ...FONTS.body3,
                            }}
                            placeholder="Enter Phone Number"
                            placeholderTextColor={COLORS.white}
                            selectionColor={COLORS.white}
                        />
                    </View>
                </View>

                {/* Password */}
                <View
                    style={{
                        marginTop: SIZES.padding * 2,
                    }}
                >
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
                        Password
                    </Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3,
                        }}
                        placeholder="Enter Password"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        secureTextEntry={!showPassword}
                    />
                    <View
                        style={{
                            position: "absolute",
                            right: 0,
                            bottom: 10,
                            width: 30,
                            height: 30,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Image
                                source={
                                    showPassword ? icons.disable_eye : icons.eye
                                }
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.white,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    const renderButton = () => {
        return (
            <View style={{ margin: SIZES.padding * 3 }}>
                <TouchableOpacity
                    style={{
                        height: 60,
                        backgroundColor: COLORS.black,
                        borderRadius: SIZES.radius / 2,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderAreaCodesModal = () => {
        const renderItem: ListRenderItem<Country> = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        flexDirection: "row",
                    }}
                    onPress={() => {
                        setSelectedArea(item);
                        setModalVisible(false);
                    }}
                >
                    <Image
                        source={{ uri: item.flag }}
                        style={{ width: 30, height: 30, marginRight: 10 }}
                    />
                    <Text style={{ ...FONTS.body4 }}>{item.name}</Text>
                </TouchableOpacity>
            );
        };

        return (
            <View>
                <Modal
                    animationType="fade"
                    visible={modalVisible}
                    transparent={true}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        <View
                            style={{
                                height: 450,
                                width: SIZES.width * 0.8,
                                backgroundColor: COLORS.lightGreen,
                                borderRadius: SIZES.radius,
                            }}
                        >
                            <FlatList
                                keyboardShouldPersistTaps={"always"}
                                data={areas}
                                renderItem={renderItem}
                                keyExtractor={(item: Country) => {
                                    return item.code;
                                }}
                                showsVerticalScrollIndicator={false}
                                style={{
                                    padding: SIZES.padding * 2,
                                    marginBottom: SIZES.padding * 2,
                                }}
                            ></FlatList>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <LinearGradient
                colors={[COLORS.lime, COLORS.emerald]}
                style={{ flex: 1 }}
            >
                <ScrollView>
                    {renderHeader()}
                    {renderLogo()}
                    {renderForm()}
                    {renderButton()}
                </ScrollView>
            </LinearGradient>
            {renderAreaCodesModal()}
        </KeyboardAvoidingView>
    );
};

export default SignUp;
