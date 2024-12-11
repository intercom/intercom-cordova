package io.intercom.android.sdk;

public class RegistrationModel {
    private String email;
    private String userId;

    public RegistrationModel(
            String email,
            String userId
    ) {
        this.email = email;
        this.userId = userId;
    }
}
