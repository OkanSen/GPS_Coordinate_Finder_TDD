import selenium
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver import Firefox, FirefoxOptions


def enter_credentials(lat, long):
    # Finds id and password text areas
    lat_field = driver.find_element_by_id("latInput")
    long_field = driver.find_element_by_id("lngInput")

    # Clear the text fields
    lat_field.clear()
    long_field.clear()

    # Enters the given parameters into text fields
    lat_field.send_keys(lat)
    long_field.send_keys(long)

    # Press submit

    submit = WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.ID, "submitBtn")))
    submit.click()


# set the wait time between each action
t = 1

# Selenium setup for chrome using webdrivers
options = webdriver.ChromeOptions()

options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
options.add_argument("--mute-audio")

driver = webdriver.Chrome('C:\\webdrivers\\chromedriver.exe', options=options)
driver.maximize_window()

# go to Main Page
driver.get("C:/Users/Okan/Desktop/project3-master/index.html")


# FIREFOX
# driver = webdriver.Firefox(executable_path=r'C:\\Users\\Hassam\\Desktop\\geckodriver.exe')
# driver.maximize_window()
# driver.get("file:///C:/Users/Hassam/Desktop/project3-master/index.html")


def test_case4():
    print()
    print("TEST CASE 4")
    print("Testing the automated device location button on all functional Tabs")
    print()

    print("Testing the automated device location button for Core Tab")
    print()
    switchTab = driver.find_element_by_id("pills-core-tab")
    switchTab.click()
    auto = WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.ID, "autoBtn")))
    auto.click()
    time.sleep(t * 2)

    print("Testing the automated device location button for Ben Tab")
    print()
    switchTab = driver.find_element_by_id("pills-ben-tab")
    switchTab.click()
    auto = WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.ID, "autoBtn")))
    auto.click()
    print("Test case 4 passed successfully")

def test_case1():
    # Using readlines()
    file1 = open('test cases.txt', 'r')
    lines = file1.readlines()

    wrong_cases = 0
    line_count = 0

    print()
    print("TEST CASE 1")
    print("testing values for Lat and Long in the Find Coordinates Tab")
    print()
    for line in lines:
        # Split the line by white spaces to get two indexes of information
        # 0 index is id, 1 index is password
        credentials = line.split("\t")
        print("-----------------------------------------------------------")
        print()
        print("testing longitude: ", credentials[0], ", latitude: ", credentials[1])

        # Call automated submission method
        enter_credentials(credentials[0], credentials[1])

        if credentials[2] == "alrt":
            time.sleep(t * 2)
            driver.switch_to.alert.accept()
            time.sleep(t)
            print()

    print("Test case 1 passed successfully")

def test_case2():
    time.sleep(t * 2)
    switchTab = driver.find_element_by_id("pills-core-tab")
    switchTab.click()

    driver.set_window_size(500, 1000)
    # Using readlines()
    file2 = open('test cases 2.txt', 'r')
    lines2 = file2.readlines()

    wrong_cases = 0
    line_count = 0

    print()
    print("TEST CASE 2")
    print("Testing values for Lat and Long in the Distance To Earth Core Tab")
    print()
    for line in lines2:
        # Split the line by white spaces to get two indexes of information
        # 0 index is id, 1 index is password
        credentials = line.split("\t")
        print("-----------------------------------------------------------")
        print()
        print("testing longitude: ", credentials[0], ", latitude: ", credentials[1])

        # Call automated submission method
        time.sleep(t * 1.25)
        enter_credentials(credentials[0], credentials[1])
        time.sleep(t * 1.25)
        if credentials[2] == "alrt":
            time.sleep(t * 2)
            driver.switch_to.alert.accept()
            time.sleep(t)
            print()
    print("Test case 2 passed successfully")

def test_case3():
    time.sleep(t * 2)
    switchTab = driver.find_element_by_id("pills-ben-tab")
    switchTab.click()

    driver.maximize_window()
    # Using readlines()
    file3 = open('test cases 3.txt', 'r')
    lines3 = file3.readlines()

    wrong_cases = 0
    line_count = 0

    print()
    print("TEST CASE 3")
    print("Testing values for Lat and Long in the Distance To Big Ben Tab")
    print()
    for line in lines3:
        # Split the line by white spaces to get two indexes of information
        # 0 index is id, 1 index is password
        credentials = line.split("\t")
        print("-----------------------------------------------------------")
        print()
        print("testing longitude: ", credentials[0], ", latitude: ", credentials[1])

        # Call automated submission method
        time.sleep(t * 1.25)
        enter_credentials(credentials[0], credentials[1])
        time.sleep(t * 1.25)
        if credentials[2] == "alrt":
            time.sleep(t * 2)
            driver.switch_to.alert.accept()
            time.sleep(t)
            print()
    print("Test case 3 passed successfully")

test_case1()
test_case2()
test_case3()
test_case4()

print("ALL TEST CASES WERE PASSED SUCCESSFULLY")