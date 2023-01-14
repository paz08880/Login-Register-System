<?php
	session_start();
	require_once "config.php";
    $email = $password = $confirm_password = "";
$email_err = $password_err = $confirm_password_err = "";



if($_SERVER["REQUEST_METHOD"] == "POST"){

    if(empty(trim($_POST["email"]))){
        $email_err = "Please enter a email.";
    }else if(!filter_var(trim($_POST["email"]), FILTER_VALIDATE_EMAIL)) {
	$email_err = "Please enter a valid email address";
		}else{
        $sql = "SELECT id FROM users WHERE email = ?";
        
        if($stmt = mysqli_prepare($con, $sql)){
            mysqli_stmt_bind_param($stmt, "s", $param_email);
            $param_email = trim($_POST["email"]);
            if(mysqli_stmt_execute($stmt)){
                mysqli_stmt_store_result($stmt);
                if(mysqli_stmt_num_rows($stmt) == 1){
					        $email_err = "This email is already taken.";
					echo "This email is already taken.";
                } else{
                    $email = trim($_POST["email"]);
                }
            } else{
            }
            mysqli_stmt_close($stmt);
        }
    }
	
    
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter a password.";     
    } elseif(strlen(trim($_POST["password"])) < 8){
        $password_err = "Password must have atleast 8 characters.";
		echo 'Password must have atleast 8 characters.' ;
    } else if(trim($_POST["password"]) == $email){
		$password_err = "Your password can't be your email.";
		echo "Your password can't be your email";
    }else{
	$password = trim($_POST["password"]);
	}
    
    if(empty(trim($_POST["confirm_password"]))){
        $confirm_password_err = "Please confirm password.";     
    } else{
        $confirm_password = trim($_POST["confirm_password"]);
        if(empty($password_err) && ($password != $confirm_password)){
			 $confirm_password_err = "Password did not match.";
            echo "password did not match";

        }
    }
    if(empty($email_err) && empty($password_err) && empty($confirm_password_err)){
        
        $sql = "INSERT INTO users (email, password) VALUES (?, ?)";
         
        if($stmt = mysqli_prepare($con, $sql)){
            mysqli_stmt_bind_param($stmt, "ss", $param_email, $param_password);
            
            $param_email = $email;
            $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
            
            if(mysqli_stmt_execute($stmt)){
				echo 1;
            } else{
			echo "error";

            }

            mysqli_stmt_close($stmt);
        }
    }
		}
    // Close connection
    mysqli_close($con);

?>