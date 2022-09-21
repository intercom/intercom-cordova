package io.intercom.android.sdk;

public class HelpCenterCollectionModel {
    private String collectionId;
    private String summary;
    private String title;

    public HelpCenterCollectionModel(
            String collectionId,
            String summary,
            String title
    ) {
        this.collectionId = collectionId;
        this.summary = summary;
        this.title = title;
    }
}
